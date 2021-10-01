import * as P5 from 'p5';
import { Engine, Runner, Render, World, Constraint, MouseConstraint, Bodies, Vector} from 'matter-js'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Particle} from "./classes/particle";
import { MassParticle } from "./classes/mass-particle";

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss']
})
export class SketchComponent implements OnInit {

  @ViewChild('sketchDiv', { static: true }) private readonly sketchDivRef: ElementRef | undefined;

  private particles: MassParticle[] = [];

  private gravity = new P5.Vector();
  private gravityFieldSource = new P5.Vector();
  private resistance = 0;
  private engine: Matter.Engine = Engine.create();
  private world: World = this.engine.world;
  // private ground = new Ground(width / 2, height - 10, width, 20);

  ngOnInit() {
    const sketch = (s: P5) => {

      s.setup = () => {
        this.engine.gravity.scale = 0.00;
        console.log('setup!');
        s.createCanvas(this.sketchDivRef?.nativeElement.offsetWidth, this.sketchDivRef?.nativeElement.offsetHeight).parent('my-canvas-id');
        this.gravity.set(0, 0)
        this.resistance = 0.02;
        const opts = {
          restitution: 0.00000001,
          friction: 0,
        }
        const floor = Bodies.rectangle(s.width / 2, s.height + 50, s.width, 100, opts);
        const ceiling = Bodies.rectangle(s.width / 2, 0 , s.width, 100, opts);
        const wallLeft = Bodies.rectangle(-50, s.height / 2, 100, s.height, opts);
        const wallRight = Bodies.rectangle(s.width + 50, s.height / 2, 100, s.height, opts);
        floor.isStatic = true;
        ceiling.isStatic = true;
        wallLeft.isStatic = true;
        wallRight.isStatic = true;
        World.add(this.world, floor);
        World.add(this.world, ceiling);
        World.add(this.world, wallLeft);
        World.add(this.world, wallRight);
        // Runner.run(this.engine);
      };

      s.preload = () => {
        console.log('preload!');
      }

      s.mouseClicked = () => {
        console.log(s.mouseX, s.mouseY);

        this.particles.unshift(new MassParticle(s, s.mouseX, s.mouseY, this.world));
      }

      s.draw = () => {
        s.background(51);
        Engine.update(this.engine);
        for (let i = this.particles.length - 1; i >= 0; i--) {
          let vector = this.calculateField();
          let a:P5 = s;
          a.colorMode(a.HSB, 1);
          a.fill(234, 1, 1);
          a.colorMode(a.RGB);
          a.strokeWeight(1);
          a.stroke(64);
          a.push();
          a.translate(vector.x, vector.y);
          a.circle(0, 0, 20* 2);
          a.pop();
          this.particles[i].CalculateGravity(vector);
          this.particles[i].show();
        }
      };
    }
    let canvas = new P5(sketch);
  }
  calculateField(): P5.Vector{
    const bodies = this.particles;
    let center = new P5.Vector();
    center.x = 0;
    center.y = 0;
    for (let i = this.particles.length - 1; i >= 0; i--) {
     let currentItem = new P5.Vector();
     currentItem.x = bodies[i].body.position.x;
      currentItem.y = bodies[i].body.position.y;
      center = P5.Vector.add(center, currentItem);
    }
    center = center.div(bodies.length);
    return center;
  }

}
