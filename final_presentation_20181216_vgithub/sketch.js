
/////////////////////
// ICM final project
/////////////////////////
//
// Author: Lydia Jessup
// Date: December 16, 2018
// Description: Displays data for 5 neighborhoods with refresh using button
// Version: Clean for winter show
//
////////////////////////////

//global variables

///////////SERIAL///////////
var serial; // variable to hold an instance of the serialport library
var portName = "/dev/cu.usbmodem143201";

//sensors
//from sensors
let pot1;
let pot2;
let pot3;
let pot4;
let buttonvalue;

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
let grid4;
let grid5;
let gridw = 300;
let gridh = 300;

//reference
let commAreas = 76;
let ca_num = 75;
let randCA1 = 23;
let randCA2 = 6;
let randCA3 = 46;
let randCA4 = 23;
let randCA5 = 4;
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

//grid4
let schoolLength4;
let groceryLength4;
let healthLength4;
let buildingLength4;
let schoolpos4 = [];
let grocerypos4 = [];
let healthpos4 = [];
let buildingpos4 = [];

//grid5
let schoolLength5;
let groceryLength5;
let healthLength5;
let buildingLength5;
let schoolpos5 = [];
let grocerypos5 = [];
let healthpos5 = [];
let buildingpos5 = [];

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

////////// Serial Setup ////////////
  //serial connection
   serial = new p5.SerialPort(); // make a new instance of the serialport library
   serial.on('list', printList); // set a callback function for the serialport list event
   serial.on('connected', serverConnected); // callback for connecting to the server
   serial.on('open', portOpen);        // callback for the port opening
   serial.on('data', serialEvent);     // callback for when new data arrives
   serial.on('error', serialError);    // callback for errors
   serial.on('close', portClose);      // callback for the port closing

  serial.list();
  serial.open(portName);

  /////////////////
  /// Serial Functions
  /////////////////
  function serverConnected() {
    print('connected to server.');
  }

  function portOpen() {
    print('the serial port opened.')
  }

  function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    print('The serial port closed.');
  }

  function serialEvent() {
    //read a string from the serial port
    //until you get carriage return and newline;
    var inString = serial.readStringUntil('\r\n');
    //console.log(inString);
    //check to see that there is actually a string
    if (inString.length >0){
      var sensors = split(inString, ',');
      if(sensors.length > 0){

        pot1 = map(sensors[0], 0, 1023, slidermax, slidermin);
        pot2 = map(sensors[1], 0, 1023, slidermax, slidermin);
        pot3 = map(sensors[2], 0, 1023, slidermax, slidermin);
        pot4 = map(sensors[3], 0, 1023, slidermax, slidermin);
        buttonvalue = sensors[4];
      }
    }
  }

  function printList(portList) {
   // portList is an array of serial port names
   for (var i = 0; i < portList.length; i++) {
   // Display the list the console:
   print(i + " " + portList[i]);
   }
  }


/////// Make html sliders //////////
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

  createCanvas(1200, 1200);

  //grid1
  grid1 = drawGrid(grid1);
  //grid 2
  grid2 = drawGrid(grid2);
  //grid 2
  grid3 = drawGrid(grid3);
  //grid 4
  grid4 = drawGrid(grid4);
  //grid 5
  grid5 = drawGrid(grid5);

  /////// Construct Data Objects ///////
  // making arrays of objects for each dataset
  makeHealth();
  makeBuildings();
  makeGrocery();
  makeSchools();

  //console.log(schoolpos1);


///Fill arrayPositions

  //fill grid 1///////////
  schoolLength1 = caSchools[randCA1].numschools;
  groceryLength1 = caGrocery[randCA1].numgrocery;
  healthLength1 = caHealth[randCA1].unemployment;
  buildingLength1 = caVacant[randCA1].numcalls;


  //schools
  arrayPositions(counter, schoolLength1, schoolpos1, grid1);
  //grocery
  arrayPositions(counter, groceryLength1, grocerypos1, grid1);
  //health
  arrayPositions(counter, healthLength1, healthpos1, grid1);
  //buildings
  arrayPositions(counter, buildingLength1, buildingpos1, grid1);


  //fill grid 2///////////
  //schools
  schoolLength2 = caSchools[randCA2].numschools;
  groceryLength2 = caGrocery[randCA2].numgrocery;
  healthLength2 = caHealth[randCA2].unemployment;
  buildingLength2 = caVacant[randCA2].numcalls;

  //school
  arrayPositions(counter, schoolLength2, schoolpos2, grid2);
  arrayPositions(counter, groceryLength2, grocerypos2, grid2);
  arrayPositions(counter, healthLength2, healthpos2, grid2);
  arrayPositions(counter, buildingLength2, buildingpos2, grid2);

  //////fill grid 3////////
  //schools
  schoolLength3 = caSchools[randCA3].numschools;
  groceryLength3 = caGrocery[randCA3].numgrocery;
  healthLength3 = caHealth[randCA3].unemployment;
  buildingLength3 = caVacant[randCA3].numcalls;

  arrayPositions(counter, schoolLength3, schoolpos3, grid3);
  arrayPositions(counter, groceryLength3, grocerypos3, grid3);
  arrayPositions(counter, healthLength3, healthpos3, grid3);
  arrayPositions(counter, buildingLength3, buildingpos3, grid3);

  //////fill grid 4////////
  //schools
  schoolLength4 = caSchools[randCA4].numschools;
  groceryLength4 = caGrocery[randCA4].numgrocery;
  healthLength4 = caHealth[randCA4].unemployment;
  buildingLength4 = caVacant[randCA4].numcalls;

  arrayPositions(counter, schoolLength4, schoolpos4, grid4);
  arrayPositions(counter, groceryLength4, grocerypos4, grid4);
  arrayPositions(counter, healthLength4, healthpos4, grid4);
  arrayPositions(counter, buildingLength4, buildingpos4, grid4);

  //////fill grid 5////////
  //schools
  schoolLength5 = caSchools[randCA5].numschools;
  groceryLength5 = caGrocery[randCA5].numgrocery;
  healthLength5 = caHealth[randCA5].unemployment;
  buildingLength5 = caVacant[randCA5].numcalls;

  arrayPositions(counter, schoolLength5, schoolpos5, grid5);
  arrayPositions(counter, groceryLength5, grocerypos5, grid5);
  arrayPositions(counter, healthLength5, healthpos5, grid5);
  arrayPositions(counter, buildingLength5, buildingpos5, grid5);

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
  // //draw fourth scree
  push();
  translate(0, 400);
  drawViz(randCA4, schoolLength4, groceryLength4, healthLength4, buildingLength4,
          schoolpos4, grocerypos4, healthpos4, buildingpos4);
  pop();
  //draw fifth screen
  push();
  translate(400, 400);
  drawViz(randCA5, schoolLength5, groceryLength5, healthLength5, buildingLength5,
          schoolpos5, grocerypos5, healthpos5, buildingpos5);
  pop();

  //redraw if button is pressed
  buttonPressed(buttonvalue);

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
    caSchools[randCA].show(round(pot4), x, y);
    displaycount++;
  }

  //draw grocery stores
  let displaycount2 = 0;
  for (i = 0; i < groceryLength; i++){
    let x = gpos[displaycount2];
    let y = gpos[displaycount2+1];
    caGrocery[randCA].show(round(pot3), x, y);
    displaycount2++;
  }

  //draw health (unemployment)
  let displaycount3 = 0;
  for (i = 0; i < healthLength; i++){
    let x = hpos[displaycount3];
    let y = hpos[displaycount3+1];
    caHealth[randCA].show(round(pot1), x, y);
    displaycount3++;
  }

  //vacant calls
  let displaycount4 = 0;
  for (i = 0; i < buildingLength; i++){
    let x = bpos[displaycount4];
    let y = bpos[displaycount4+1];
    caVacant[randCA].show(round(pot2), x, y);
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


//function keyPressed(){

function buttonPressed(buttonvalue){

  if (buttonvalue == 1) {

    ///redraw grids
    grid1 = drawGrid(grid1);
    grid2 = drawGrid(grid2);
    grid3 = drawGrid(grid3);
    grid4 = drawGrid(grid4);
    grid5 = drawGrid(grid5);

    //re-initialize arrays
    //one
    schoolpos1 = [];
    grocerypos1 = [];
    healthpos1 = [];
    buildingpos1 = [];
    //two
    schoolpos2 = [];
    grocerypos2 = [];
    healthpos2 = [];
    buildingpos2 = [];
    //three
    schoolpos3 = [];
    grocerypos3 = [];
    healthpos3 = [];
    buildingpos3 = [];
    //three
    schoolpos4 = [];
    grocerypos4 = [];
    healthpos4 = [];
    buildingpos4 = [];
    //three
    schoolpos5 = [];
    grocerypos5 = [];
    healthpos5 = [];
    buildingpos5 = [];


    //re-assign arrayPositions
    //grid 1
    arrayPositions(counter, schoolLength1, schoolpos1, grid1);
    arrayPositions(counter, groceryLength1, grocerypos1, grid1);
    arrayPositions(counter, healthLength1, healthpos1, grid1);
    arrayPositions(counter, buildingLength1, buildingpos1, grid1);

    //grid2
    arrayPositions(counter, schoolLength2, schoolpos2, grid2);
    arrayPositions(counter, groceryLength2, grocerypos2, grid2);
    arrayPositions(counter, healthLength2, healthpos2, grid2);
    arrayPositions(counter, buildingLength2, buildingpos2, grid2);

    //grid3
    arrayPositions(counter, schoolLength3, schoolpos3, grid3);
    arrayPositions(counter, groceryLength3, grocerypos3, grid3);
    arrayPositions(counter, healthLength3, healthpos3, grid3);
    arrayPositions(counter, buildingLength3, buildingpos3, grid3);

    //grid4
    arrayPositions(counter, schoolLength4, schoolpos4, grid4);
    arrayPositions(counter, groceryLength4, grocerypos4, grid4);
    arrayPositions(counter, healthLength4, healthpos4, grid4);
    arrayPositions(counter, buildingLength4, buildingpos4, grid4);

    //grid5
    arrayPositions(counter, schoolLength5, schoolpos5, grid5);
    arrayPositions(counter, groceryLength5, grocerypos5, grid5);
    arrayPositions(counter, healthLength5, healthpos5, grid5);
    arrayPositions(counter, buildingLength5, buildingpos5, grid5);

  }
}
