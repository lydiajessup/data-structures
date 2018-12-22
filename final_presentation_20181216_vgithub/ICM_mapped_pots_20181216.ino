/*

Title: ICM Final Winter Show Control Box
Author: Lydia Jessup
Date: December 16, 2018
Description: Takes in values from four sliding potentiometers and a button on control box 
             for Data Structures project

*/

////declare variables

int button = 2;
int buttonState = 0;
int slider1;
int slider2;
int slider3;
int slider4;

void setup() {

  //start
  Serial.begin(9600);

  //configure digital input
  pinMode(button, INPUT);
  

}

void loop() {

  //read potentiometer
  slider1 = analogRead(A0);
  //print results
  Serial.print(slider1);  
  Serial.print(",");

  //number2
  slider2 = analogRead(A1);
  //print results
  Serial.print(slider2);  
  Serial.print(",");

  //number3
  slider3 = analogRead(A2);
  //print results
  Serial.print(slider3);  
  Serial.print(",");

  //number4
  slider4 = analogRead(A3);
  //print results
  Serial.print(slider4);  
  Serial.print(",");

  //read button (5)
  buttonState = digitalRead(button);
  Serial.println(buttonState);
  
//  if (buttonState == HIGH){
//    Serial.println("button pressed");
//  }


}
