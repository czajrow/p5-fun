import * as P5 from "p5";
import {Engine, Runner, Render, World, Constraint, MouseConstraint, Bodies, Body} from 'matter-js'

export class Particle {

  private readonly radius: number = 32;

  private readonly position = new P5.Vector();
  private readonly velocity = new P5.Vector();
  private readonly acceleration = new P5.Vector();
  private readonly color: number;
  private meanPos: number;
  public dead: boolean = false;
  private readonly body: Body;

  constructor(
    private s: P5,
    x: number,
    y: number,
    world: World,
  ) {
    this.position.set(x, y);
    this.meanPos = this.position.y;
    this.velocity.set(this.s.random(-50, 50), 0);
    const size = Math.random();
    this.color = size;
    this.radius = (size + 1) * 30;
    this.body = Bodies.circle(x, y, this.radius, {
      restitution: 0.8,
      frictionAir: 0,
      frictionStatic: 0,
      friction: 0,
    });
    // Body.setMass(this.body, this.radius * this.radius);
    Body.setMass(this.body, this.radius * this.radius * 0.0001);
    World.add(world, this.body);
  }

  public show(): void {
    //
    // this.s.circle(this.position.x, this.position.y, this.radius * 2);
    this.s.colorMode(this.s.HSB, 1);
    this.s.fill(this.color, 1, 1);
    this.s.colorMode(this.s.RGB);
    this.s.strokeWeight(1);
    this.s.stroke(64);

    const pos = this.body.position;
    const angle = this.body.angle;
    this.s.push();
    this.s.translate(pos.x, pos.y);
    this.s.rotate(angle);
    this.s.circle(0, 0, this.radius * 2);
    this.s.pop();
  }

  public applyForce(force: P5.Vector): void {
    this.acceleration.add(force);
  }

  public multiplyVelocity(factor: number): void {
    this.velocity.mult(factor);
  }

  // public update(): void {
  //   this.velocity.add(this.acceleration);
  //   this.position.add(this.velocity);
  //   this.acceleration.setMag(0);
  //   this.boundaries();
  //   this.meanPos = (this.meanPos + this.position.y) * 0.5;
  //   if (Math.abs(this.meanPos - this.position.y) < 0.001) {
  //     this.dead = true;
  //   }
  // }
  //
  // private boundaries(): void {
  //   const dimensions: { index: 'x' | 'y'; max: number }[] = [
  //     {index: 'x', max: this.s.width},
  //     {index: 'y', max: this.s.height},
  //   ];
  //   for (const dimension of dimensions) {
  //     if (this.position[dimension.index] <= this.radius) {
  //       this.position[dimension.index] = this.radius;
  //       this.velocity[dimension.index] *= -1;
  //     } else if (this.position[dimension.index] > dimension.max - this.radius) {
  //       this.position[dimension.index] = dimension.max - this.radius;
  //       this.velocity[dimension.index] *= -1;
  //     }
  //   }
  // }
}
