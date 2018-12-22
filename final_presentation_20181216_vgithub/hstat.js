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

    fill(161, 193, 129, 255);
    this.shrink = map(this.slider, 0, 255, this.w, 0);

    rectMode(CENTER);
    rect(this.i*this.w+this.centerX,
            this.j*this.w+this.centerY,
            this.w-this.shrink,
            this.w-this.shrink);

  }
}
