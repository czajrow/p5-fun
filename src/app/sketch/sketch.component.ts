import * as P5 from 'p5';
import {Component, OnInit} from '@angular/core';
import {Particle} from "./classes/particle";

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss']
})
export class SketchComponent implements OnInit {

  private particle: Particle | undefined;

  private gravity = new P5.Vector();
  private resistance = 0;

  ngOnInit() {
    const sketch = (s: P5) => {

      s.setup = () => {
        console.log('setup');
        s.createCanvas(400, 400).parent('my-canvas-id');
        this.gravity.set(0, 0.4)
        this.resistance = 0.005;
        this.particle = new Particle(s, s.width / 2, 0);
      };

      s.preload = () => {
        console.log('preload');
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
