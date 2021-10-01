import * as P5 from 'p5';
import { Engine, Runner, Render, World, Constraint, MouseConstraint, Bodies} from 'matter-js'
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
  private engine: Matter.Engine = Engine.create();
  private world: World = this.engine.world;
  // private ground = new Ground(width / 2, height - 10, width, 20);

  ngOnInit() {
    const sketch = (s: P5) => {

      s.setup = () => {
        console.log('setup!');
        s.createCanvas(this.sketchDivRef?.nativeElement.offsetWidth, this.sketchDivRef?.nativeElement.offsetHeight).parent('my-canvas-id');
        this.gravity.set(0, 1.9)
        this.resistance = 0.02;
        const floor = Bodies.rectangle(s.width / 2, s.height + 50, s.width, 100, {restitution: 0.8});
        const wallLeft = Bodies.rectangle(-50, s.height / 2, 100, s.height, {restitution: 0.8});
        const wallRight = Bodies.rectangle(s.width + 50, s.height / 2, 100, s.height, {restitution: 0.8});
        floor.isStatic = true;
        wallLeft.isStatic = true;
        wallRight.isStatic = true;
        World.add(this.world, floor);
        World.add(this.world, wallLeft);
        World.add(this.world, wallRight);
        // Engine.run(this.engine);
        Runner.run(this.engine);
      };

      s.preload = () => {
        console.log('preload!');
      }

      s.mouseClicked = () => {
        this.particles.unshift(new Particle(s, s.mouseX, s.mouseY, this.world));
      }

      s.draw = () => {
        s.background(51);
        // Engine.update(this.engine);
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].show();
        }
      };
    }
    let canvas = new P5(sketch);
  }

}
