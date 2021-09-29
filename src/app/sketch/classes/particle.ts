import * as P5 from "p5";

export class Particle {

  private readonly radius: number = 32;

  private readonly position = new P5.Vector();
  private readonly velocity = new P5.Vector();
  private readonly acceleration = new P5.Vector();

  constructor(
    private s: P5,
    x: number,
    y: number,
  ) {
    this.position.set(x, y);
  }

  public setPosition(x: number, y: number) {
    this.position.set(x, y);
  }

  public show(): void {
    this.s.fill(255, 0, 0);
    this.s.circle(this.position.x, this.position.y, this.radius * 2);
  }

  public applyForce(force: P5.Vector): void {
    this.acceleration.add(force);
  }

  public multiplyVelocity(factor: number): void {
    this.velocity.mult(factor);
  }

  public update(): void {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.setMag(0);
    this.boundaries();
  }

  private boundaries(): void {
    const dimensions: { index: 'x' | 'y'; max: number }[] = [
      {index: 'x', max: this.s.width},
      {index: 'y', max: this.s.height},
    ];
    for (const dimension of dimensions) {
      if (this.position[dimension.index] <= this.radius) {
        this.position[dimension.index] = this.radius;
        this.velocity[dimension.index] *= -1;
      } else if (this.position[dimension.index] > dimension.max - this.radius) {
        this.position[dimension.index] = dimension.max - this.radius;
        this.velocity[dimension.index] *= -1;
      }
    }
  }
}
