import * as P5 from 'p5';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Particle} from "./classes/particle";

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss']
})
export class SketchComponent implements OnInit {

  @ViewChild('sketchDiv', { static: true }) private readonly sketchDivRef: ElementRef | undefined;

  private particle: Particle | undefined;

  private gravity = new P5.Vector();
  private resistance = 0;

  ngOnInit() {
    console.log('DIV', this.sketchDivRef?.nativeElement);
    const sketch = (s: P5) => {

      s.setup = () => {
        console.log('setup!');
        console.log(this.sketchDivRef?.nativeElement.offsetWidth, this.sketchDivRef?.nativeElement.offsetHeight);
        s.createCanvas(this.sketchDivRef?.nativeElement.offsetWidth, this.sketchDivRef?.nativeElement.offsetHeight).parent('my-canvas-id');
        this.gravity.set(0, 0.4)
        this.resistance = 0.005;
        this.particle = new Particle(s, s.width / 2, 0);
      };

      s.preload = () => {
        console.log('preload!');
      }

      s.draw = () => {
        s.background(51);
        this.particle?.applyForce(this.gravity);
        this.particle?.multiplyVelocity(1 - this.resistance);
        this.particle?.update();
        this.particle?.show();
      };
    }
    let canvas = new P5(sketch);
  }

}
