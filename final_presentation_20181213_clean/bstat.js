

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

      // noFill();
      // stroke(174, 126, 183, this.slider);
      // rect(this.i*this.w,
      //   this.j*this.w,
      //   this.w-this.size/2,
      //   this.w-1);
     // //small rect 1
     // rect(this.i*this.w+20,
     //      this.j*this.w+25,
     //      (this.w-this.size)/2,
     //      this.w-this.size-5);
     //
     // rect(this.i*this.w+20,
     //      this.j*this.w+40,
     //      (this.w-this.size-10),
     //      this.w-this.size-20);

     //before
     // rect(this.i*this.w,
     //         this.j*this.w,
     //         this.w,
     //         this.w);
    this.shrink = map(this.slider, 0, 255, this.w, 0);
    rectMode(CENTER);
     rect(this.i*this.w+this.centerX,
             this.j*this.w+this.centerY,
             this.w-this.shrink,
             this.w-this.shrink);
      //
      // ellipse(this.i*this.w+this.centerX,
      //         this.j*this.w+this.centerY,
      //         this.w-this.size,
      //         this.w-this.size);
      //ellipse(100, 100, 50, 50);
      //test
      //ellipse(100, 100, 50, 50);
      // randomSeed(99);
      // for (this.i = 0; this.i < this.numcalls; this.i++){
      //   noStroke();
      //   fill(174, 126, 183, this.slider);
      //   this.x = random(50, 350);
      //   this.y = random(50, 350);
      //   this.incriment = 5;
      //   this.w = 25;
      //   this.h = 50;
      //   rectMode(CENTER);
      //
      //   for (this.j = 0; this.j < 6; this.j++){
      //     rect(this.x, this.y, this.w, this.h);
      //     this.w = this.w - this.incriment;
      //     this.h = this.h - this.incriment;
      //   }
      //}
    }
}
