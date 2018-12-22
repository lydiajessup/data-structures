/////////////////////
// Health Statistics class
/////////////////////////

class HStat {
  constructor(community_area, community_area_name, unemployment,
              w, size, centerX, centerY) {
    this.community_area = community_area;
    this.community_area_name = community_area_name;
    this.unemployment = round(unemployment);
    this.w = w;
    this.size = size;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  show(slider1_value, i, j){

    this.slider = slider1_value;
    this.i = i;
    this.j = j;

    // fill(161, 193, 129, this.slider);
    //
    // rect(this.i*this.w,
    //         this.j*this.w,
    //         this.w,
    //         this.w);

    fill(161, 193, 129, 255);
    this.shrink = map(this.slider, 0, 255, this.w, 0);

    rectMode(CENTER);
    rect(this.i*this.w+this.centerX,
            this.j*this.w+this.centerY,
            this.w-this.shrink,
            this.w-this.shrink);

    // noStroke();
    // triangle(this.i*this.w, this.j*this.w,
    //          this.i*this.w, this.j*this.w+this.w-this.size,
    //          this.i*this.w+this.w-this.size, this.j*this.w);
    // ellipse(this.i*this.w+this.centerX,
    //         this.j*this.w+this.centerY,
    //         this.w-this.size,
    //         this.w-this.size);

    // this.incriment = 400/this.unemployment;
    // //console.log(slider1_value);
    //
    // //practice
    // fill(161, 193, 129, this.slider);
    // ellipse(100, 200, 50, 50);

    // for (this.i = 0; this.i < this.unemployment; this.i++){
    //   //console.log(this.unemployment);
    //   noStroke();
    //   fill(161, 193, 129, this.slider);
    //   ellipse(this.i*this.incriment, 200, this.unemployment, 200);
    // }
  }
}
