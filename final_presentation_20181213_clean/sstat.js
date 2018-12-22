/////////////////////
// School Statistics class
/////////////////////////

class SStat {
  constructor(community_area, community_area_name, numschools,
              w, size, centerX, centerY) {
    this.community_area = community_area;
    this.community_area_name = community_area_name;
    this.numschools = numschools;
    this.w = w;
    this.size = size;
    this.centerX = centerX;
    this.centerY = centerY;
    //console.log(this.numschools);
    //this.x = random(0, 400);
    //this.y = random(0, 400);
  }

  show(slider4_value, i, j){

    this.slider = slider4_value;
    this.i = i;
    this.j = j;
    //console.log(this.size);

    //practice
    //noStroke();

    //ellipse(200, 200, 50, 50);
    // stroke(115, 167, 218, this.slider);
    // strokeWeight(2);
    // line(this.i*this.w,
    //      this.j*this.w,
    //      this.i*this.w+this.w-this.size,
    //      this.j*this.w+this.w);

    ////before
    //fill(115, 167, 218, this.slider);
    // rect(this.i*this.w,
    //         this.j*this.w,
    //         this.w,
    //         this.w);

    fill(115, 167, 218, 255);
    this.shrink = map(this.slider, 0, 255, this.w, 0);

    rectMode(CENTER);
    rect(this.i*this.w+this.centerX,
          this.j*this.w+this.centerY,
          this.w-this.shrink,
          this.w-this.shrink);
    // ellipse(this.i*this.w+this.centerX,
    //         this.j*this.w+this.centerY,
    //         this.w-this.size,
    //         this.w-this.size);

    // randomSeed(99);
    //
    // for (this.i = 0; this.i < this.numschools; this.i++){
    //   //console.log(this.unemployment);
    //   noStroke();
    //   fill(115, 167, 218, this.slider);
    //
    //   this.star = new Star(random(50, 350), random(200, 350), 10, 50, this.numschools);
    //   this.star.show();
    // }

    // this.star = new Star(200, 200, 10, 50, this.numschools);
    // this.star.show();

  }


}
