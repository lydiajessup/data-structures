
/////////////////////
// ICM final project
/////////////////////////
//
// Author: Lydia Jessup
// Date: December 13, 2018
// Description: Displays data for 3 neighborhoods - no refresh
// Version: Clean for winter show
//
////////////////////////////

//global variables

//sliders
let slider1;
let slider2;
let slider3;
let slider4;
let slidermin = 0;
let slidermax = 255;
let sliderstart = 255;
let slider1_value;
let slider2_value;
let slider3_value;
let slider4_value;

//data
let urlHealth;
let vacantCalls;
let helathStats;
let groceryStores;
let numSchools;

//make arrays
let caHealth = [];
let caVacant = [];
let caGrocery = [];
let caSchools = [];

//grid
let w = 30;
let centerX = w/2;
let centerY = w/2;
let columns;
let rows;
let grid1;
let grid2;
let grid3;
let gridw = 400;
let gridh = 400;

//reference
let commAreas = 76;
let ca_num = 75;
let randCA1 = 23;
let randCA2 = 6;
let randCA3 = 46;
let randCA4 = 6;
let randCA5 = 23;
let randCA6 = 41;

//grid1
let schoolLength1;
let groceryLength1;
let buildingLength1;
let healthLength1;
let schoolpos1 = [];
let grocerypos1 = [];
let buildingpos1 = [];
let healthpos1 = [];

//grid2
let schoolLength2;
let groceryLength2;
let healthLength2;
let buildingLength2;
let schoolpos2 = [];
let grocerypos2 = [];
let healthpos2 = [];
let buildingpos2 = [];

//grid3
let schoolLength3;
let groceryLength3;
let healthLength3;
let buildingLength3;
let schoolpos3 = [];
let grocerypos3 = [];
let healthpos3 = [];
let buildingpos3 = [];

let circlesize = 10;
let counter = 0;


//preload the data
function preload(){
  //Health Data
  urlHealth = "https://data.cityofchicago.org/resource/gtem-tu7s.json";
  healthStats = loadJSON(urlHealth, gotData);
  //building data
  vacantCalls = loadTable('vacant_sums_20181125.csv', 'csv', 'header');
  //grocery Stores
  groceryStores = loadTable('grocery_totals_20181124.csv', 'csv', 'header');
  //console.log(groceryStores);
  numSchools = loadTable('school_sum_20181125.csv', 'csv', 'header');
}

//got data callback
function gotData(data){
  //show first crime
  //console.log(data.length);
}

//construct shapes
function setup() {

/////// make sliders//////////
  slider1 = createSlider(slidermin, slidermax, sliderstart);
  slider2 = createSlider(slidermin, slidermax, sliderstart);
  slider3 = createSlider(slidermin, slidermax, sliderstart);
  slider4 = createSlider(slidermin, slidermax, sliderstart);

  //assign sliders
  slider1.parent('#control1');
  slider2.parent('#control2');
  slider3.parent('#control3');
  slider4.parent('#control4');

  ////////// Construct Environment /////////////
  // make grid setup
  // initialize with all 0s

  createCanvas(1200, 400);

  //grid1
  grid1 = drawGrid(grid1);
  //grid 2
  grid2 = drawGrid(grid2);
  //grid 2
  grid3 = drawGrid(grid3);

  /////// Construct Data Objects ///////
  // making arrays of objects for each dataset
  makeHealth();
  makeBuildings();
  makeGrocery();
  makeSchools();


///Fill arrayPositions
  //fill grid 1
  //schools
  schoolLength1 = caSchools[randCA1].numschools;
  arrayPositions(counter, schoolLength1, schoolpos1, grid1);
  //grocery
  groceryLength1 = caGrocery[randCA1].numgrocery;
  arrayPositions(counter, groceryLength1, grocerypos1, grid1);
  // //health
  healthLength1 = caHealth[randCA1].unemployment;
  arrayPositions(counter, healthLength1, healthpos1, grid1);
  // //buildings
  buildingLength1 = caVacant[randCA1].numcalls;
  arrayPositions(counter, buildingLength1, buildingpos1, grid1);


  //fill grid 2
  //schools
  schoolLength2 = caSchools[randCA2].numschools;
  arrayPositions(counter, schoolLength2, schoolpos2, grid2);
  //grocery
  groceryLength2 = caGrocery[randCA2].numgrocery;
  arrayPositions(counter, groceryLength2, grocerypos2, grid2);
  //health
  healthLength2 = caHealth[randCA2].unemployment;
  arrayPositions(counter, healthLength2, healthpos2, grid2);
  //buildings
  buildingLength2 = caVacant[randCA2].numcalls;
  arrayPositions(counter, buildingLength2, buildingpos2, grid2);

  //fill grid 3
  //schools
  schoolLength3 = caSchools[randCA3].numschools;
  arrayPositions(counter, schoolLength3, schoolpos3, grid3);
  //grocery
  groceryLength3 = caGrocery[randCA3].numgrocery;
  arrayPositions(counter, groceryLength3, grocerypos3, grid3);
  //health
  healthLength3 = caHealth[randCA3].unemployment;
  arrayPositions(counter, healthLength3, healthpos3, grid3);
  //buildings
  buildingLength3 = caVacant[randCA3].numcalls;
  arrayPositions(counter, buildingLength3, buildingpos3, grid3);



}


function draw() {
  background(12, 33, 55);

  //assign value to slider var
  slider1_value = slider1.value();
  slider2_value = slider2.value();
  slider3_value = slider3.value();
  slider4_value = slider4.value();

  ////draw multiple screens using translate/////
  //draw first screen
  drawViz(randCA1, schoolLength1, groceryLength1, healthLength1, buildingLength1,
          schoolpos1, grocerypos1, healthpos1, buildingpos1);
  //draw second screen
  push();
  translate(400, 0);
  drawViz(randCA2, schoolLength2, groceryLength2, healthLength2, buildingLength2,
          schoolpos2, grocerypos2, healthpos2, buildingpos2);
  pop();
  //draw third screen
  push();
  translate(800, 0);
  drawViz(randCA3, schoolLength3, groceryLength3, healthLength3, buildingLength3,
          schoolpos3, grocerypos3, healthpos3, buildingpos3);
  pop();
  // // //draw fourth scree
  // push();
  // translate(0, 400);
  // drawViz(randCA4);
  // pop();
  // //draw fifth screen
  // push();
  // translate(400, 400);
  // drawViz(randCA5);
  // pop();


}


//////////////////////
// Drawing functions
//////////////////////

///// Draw Canvas Pattern
//need to add in school length, position array and slider value
function drawViz(randCA, schoolLength, groceryLength, healthLength, buildingLength,
                schoolpos, grocerypos, healthpos, buildingpos){

  let sLength = schoolLength;
  let gLength = groceryLength;
  let hLength = healthLength;
  let bLength = buildingLength;
  let spos = schoolpos;
  let gpos = grocerypos;
  let hpos = healthpos;
  let bpos = buildingpos;

  let displaycount = 0;
  for (i = 0; i < sLength; i++){
    let x = spos[displaycount];
    let y = spos[displaycount+1];
    caSchools[randCA].show(slider4_value, x, y);
    displaycount++;
  }

  //draw grocery stores
  let displaycount2 = 0;
  for (i = 0; i < groceryLength; i++){
    let x = gpos[displaycount2];
    let y = gpos[displaycount2+1];
    caGrocery[randCA].show(slider3_value, x, y);
    displaycount2++;
  }

  //draw health (unemployment)
  let displaycount3 = 0;
  for (i = 0; i < healthLength; i++){
    let x = hpos[displaycount3];
    let y = hpos[displaycount3+1];
    caHealth[randCA].show(slider1_value, x, y);
    displaycount3++;
  }

  //vacant calls
  let displaycount4 = 0;
  for (i = 0; i < buildingLength; i++){
    let x = bpos[displaycount4];
    let y = bpos[displaycount4+1];
    caVacant[randCA].show(slider2_value, x, y);
    displaycount4++;
  }
}

/////////Construct  Objects for each dataset ////////////

///// School data
function makeSchools(){
  for (i = 0; i <commAreas; i++){
    let community_area = numSchools.getRow(i).get(1);
    let community_area_name = numSchools.getRow(i).get(2);
    let numschools = numSchools.getRow(i).get(3);
    caSchools[i] = new SStat(community_area,
                             community_area_name,
                             numschools,
                             w,
                             circlesize,
                             centerX,
                             centerY);
    }
}


///// Health Stats
function makeHealth(){
  //make health object with unemployment info
  //use loop to go through all community areas
  for (i =0; i < commAreas; i++){
    let community_area = healthStats[i].community_area;
    let community_area_name = healthStats[i].community_area_name;
    let unemployment = healthStats[i].unemployment;
    caHealth[i] = new HStat(community_area,
                            community_area_name,
                            unemployment,
                            w,
                            circlesize,
                            centerX,
                            centerY);
  }

}

///// Building Stats
function makeBuildings (){
  //make array of bstat objects - vacant calls by community area
  for (i = 0; i < ca_num; i++){
    let community_area = vacantCalls.getRow(i).get(1);
    let num_calls = vacantCalls.getRow(i).get(2);
    caVacant[i] = new BStat(community_area,
                                  num_calls,
                                  w,
                                  circlesize,
                                  centerX,
                                  centerY);
  }
}

///// Grocery Stores
function makeGrocery () {
    for (i = 0; i < ca_num; i++ ){
      let community_area = groceryStores.getRow(i).get(1);
      let community_area_name = groceryStores.getRow(i).get(3);
      let numgrocery = groceryStores.getRow(i).get(2);
      caGrocery[i] = new GStat(community_area,
                               community_area_name,
                               numgrocery,
                               w,
                               circlesize,
                               centerX,
                               centerY);
    }
}


////// Draw Grid
function drawGrid (intgrid){
  let grid = intgrid;
//make width of boxes
  columns = floor(gridw/w);
  rows = floor(gridh/w);

//make grid
  grid = new Array(columns);
  for(var i = 0; i < columns; i++){
		grid[i] = new Array(rows);
  }

//visualize grid (optional/for debugging)
  // for (var i = 0; i < columns; i++){
  //   for (var j = 0; j < rows; j++){
  //     stroke(0);
  //     //fill(255,0,0);
  //     rect(i*w, j*w, w-1, w-1);
  //   }
  // }

//initialize
  for (var i = 0; i < columns; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }

  return grid;
}


///// Set up position of coordinates for visuals
function arrayPositions (intcounter, intarrayLength, shapepos, intgrid){

  //set variables for what we are passing in
  let counter = intcounter;
  let arrayLength = intarrayLength;
  let arrayFill = shapepos;
  let grid = intgrid;

  //pick a random place to start
  let i = round(random(0,columns-1));
  let j = round(random(0,rows-1));

  //keep trying to place boxes until all boxes have been placed
  while (counter < arrayLength) {

    //add random step from random starting position
    i = i+ round(random(-1, 1));
    j = j+ round(random(-1, 1));

    //check to make sure x position is not out of bounds
    //if out of bounds set to 0
    if (i <0 || i> columns-1){
      i = 0;
    }
    //check to make sure y position is not out of bounds
    //if out of bounds set to 0
    if (j <0 || j > rows-1){
      j = 0;
    }
    //if position is open and array is not already filled
    if (grid[i][j] == 0){
      arrayFill.push(i);
      arrayFill.push(j);
      //incriment
      counter++;
      grid[i][j] = 1;
    }
  }
}

//////// Create sliders

// function constructSliders (){
//
//   //create sliders
//   slider1 = createSlider(slidermin, slidermax, sliderstart);
//   slider2 = createSlider(slidermin, slidermax, sliderstart);
//   slider3 = createSlider(slidermin, slidermax, sliderstart);
//   slider4 = createSlider(slidermin, slidermax, sliderstart);
//
//   //assign sliders
//   slider1.parent('#control1');
//   slider2.parent('#control2');
//   slider3.parent('#control3');
//   slider4.parent('#control4');
//
//
// }
