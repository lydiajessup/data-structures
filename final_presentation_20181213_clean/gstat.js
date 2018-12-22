/////////////////////
/// Grocery stat class
/////////////////////

class GStat {
  constructor(community_area, community_area_name, numgrocery,
              w, size, centerX, centerY) {
    this.community_area = community_area;
    this.community_area_name = community_area_name;
    this.numgrocery = numgrocery;
    this.w = w;
    this.size = size;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  show(slider3_value, i, j){

    this.slider = slider3_value;
    this.i = i;
    this.j = j;

    //practice
    this.slider = slider3_value;

    //before
    // fill(221, 191, 131, this.slider);
    // noStroke();
    // rect(this.i*this.w,
    //         this.j*this.w,
    //         this.w,
    //         this.w);

    noStroke();
    fill(221, 191, 131, 255);
    this.shrink = map(this.slider, 0, 255, this.w, 0);
    rectMode(CENTER);
    rect(this.i*this.w+this.centerX,
          this.j*this.w+this.centerY,
          this.w-this.shrink,
          this.w-this.shrink);


  //  noFill();
    //stroke(221, 191, 131, this.slider);
    // ellipse(this.i*this.w+this.centerX,
    //         this.j*this.w+this.centerY,
    //         this.w-this.size,
    //         this.w-this.size);

    // ellipse(this.i*this.w+this.size/2,
    //       this.j*this.w+this.size,
    //       this.w-this.size*2,
    //       this.w-this.size*2);
    // ellipse(this.i*this.w+this.w-this.size/2,
    //       this.j*this.w+this.w-this.size/2,
    //       this.w-this.size*2,
    //       this.w-this.size*2);

    //ellipse(200, 100, 50, 50);

    // for (this.i = 0; this.i < this.numgrocery; this.i++){
    //
    //   this.slider = slider3_value;
    //   //console.log(slider3_value);
    //
    //   stroke(221, 191, 131, this.slider);
    //   strokeWeight(4);
    //   line(this.i*50+50, this.i, 200-this.numgrocery, 400-this.numgrocery);
    //   //console.log(this.numgrocery);
    //   //line(this.numgrocery+this.i*10, this.numgrocery,400, 400);
    // }

    //line(this.numgrocery*5, this.numgrocery*5, this.numgrocery*2, this.numgrocery*2);
  }
}
