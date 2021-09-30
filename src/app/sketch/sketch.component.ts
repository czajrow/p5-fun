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

  private particles: Particle[] = [];

  private gravity = new P5.Vector();
  private resistance = 0;

  ngOnInit() {
    const sketch = (s: P5) => {

      s.setup = () => {
        console.log('setup!');
        s.createCanvas(this.sketchDivRef?.nativeElement.offsetWidth, this.sketchDivRef?.nativeElement.offsetHeight).parent('my-canvas-id');
        this.gravity.set(0, 1.9)
        this.resistance = 0.02;
      };

      s.preload = () => {
        console.log('preload!');
      }

      s.mouseClicked = () => {
        this.particles.unshift(new Particle(s, s.mouseX, s.mouseY));
      }

      s.draw = () => {
        s.background(51);
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].applyForce(this.gravity);
          this.particles[i].multiplyVelocity(1 - this.resistance);
          this.particles[i].update();
          this.particles[i].show();
          if (this.particles[i].dead) {
            this.particles.splice(i, 1);
          }
        }
      };
    }
    let canvas = new P5(sketch);
  }

}
