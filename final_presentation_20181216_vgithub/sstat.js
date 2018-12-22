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
  }

  show(slider4_value, i, j){

    this.slider = slider4_value;
    this.i = i;
    this.j = j;
    //console.log(this.size);

    fill(115, 167, 218, 255);
    this.shrink = map(this.slider, 0, 255, this.w, 0);

    rectMode(CENTER);
    rect(this.i*this.w+this.centerX,
          this.j*this.w+this.centerY,
          this.w-this.shrink,
          this.w-this.shrink);
  }
}
