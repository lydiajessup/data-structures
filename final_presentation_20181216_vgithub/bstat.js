

class BStat {
    constructor(community_area, num_calls, w,
                size,
                centerX,
                centerY) {
      this.community_area = community_area;
      this.numcalls = num_calls;
      this.w = w;
      this.size = size;
      this.centerX = centerX;
      this.centerY = centerY;
    }

    show(slider2_value, i, j){

      this.slider = slider2_value;
      this.shrink = map(this.slider, 0, 255, 0, this.w);
      //console.log(this.shrink);
      this.i = i;
      this.j = j;
      //fill(174, 126, 183, this.slider);
      fill(174, 126, 183, 255);

      this.shrink = map(this.slider, 0, 255, this.w, 0);
      rectMode(CENTER);
      rect(this.i*this.w+this.centerX,
             this.j*this.w+this.centerY,
             this.w-this.shrink,
             this.w-this.shrink);
      
    }
}
