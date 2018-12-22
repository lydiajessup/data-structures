////////////////////
// Star class

class Star {
  constructor(x, y, radius1, radius2, npoints) {
    this.x = x;
    this.y = y;
    this.radius1 = radius1;
    this.radius2 = radius2;
    this.npoints = npoints;
    this.angle = TWO_PI / this.npoints;
    this.halfAngle = this.angle/2.0;
  }

  show(){
    beginShape();

    for (this.a = 0; this.a < TWO_PI; this.a += this.angle) {
      this.sx = this.x + cos(this.a) * this.radius2;
      this.sy = this.y + sin(this.a) * this.radius2;

      vertex(this.sx, this.sy);

      this.sx = this.x + cos(this.a+this.halfAngle) * this.radius1;
      this.sy = this.y + sin(this.a+this.halfAngle) * this.radius1;

      vertex(this.sx, this.sy);
    }

    endShape(CLOSE);
  }

}
