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


    noStroke();
    fill(221, 191, 131, 255);
    this.shrink = map(this.slider, 0, 255, this.w, 0);
    rectMode(CENTER);
    rect(this.i*this.w+this.centerX,
          this.j*this.w+this.centerY,
          this.w-this.shrink,
          this.w-this.shrink);
  }
}
