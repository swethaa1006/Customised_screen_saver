//this is a code with 3 sub codes
//key 0 has the sine wave generating a mesmerising wave
//key 1 has circleArt that you can make
//key 2 has a photobooth that generates to save on your computer


let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let zvalues;
let key = 0;
var array = 10;
var num = 10;

//video initialisations
var video;
var button;
var snapshots = [];
var counter = 0;
var vScale = 4;
var total;

//creating button
var button;
var button1;
var button2;
var save_screensaver;

//seting up canvas and camera
function setup() {
  createCanvas(screen.width, screen.height);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  colorMode(HSB, 100);
  video = createCapture(VIDEO, ready);
  video.size(320, 240);
  video.hide();

  //button for waves
  button = createButton('Waves');
  button.position(340, 40);
  button.style("background-color: #4CAF50; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
  button.mousePressed(changeKey);

  //button for circle art
  button1 = createButton('Circle Art');
  button1.position(540, 40);
  button1.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
  button1.mousePressed(changeKey1);

  //button for photobooth
  button2 = createButton('Photobooth');
  button2.position(740, 40);
  button2.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
  button2.mousePressed(changeKey2);


  //button for saving background
  save_screensaver = createButton('Save Image');
  save_screensaver.position(940, 40);
  save_screensaver.style("background-color: #303030; border: none;  color: #ff0000; padding: 15px 32px;  font-size: 16px;");
  save_screensaver.mousePressed(saveScreenSaver);
}

//ready function called by the camera to check if its ready
var go = false;
function ready() {
  go = true;
}

// draw fuction for waves
function draw() {

  if (key == 0) {

    background(0);
    calcWave(75.0);
    renderWave();
    calcWave(20);
    renderWave1();

  } else if (key == 1) {

    background(0, 0.2);
    circleArt();

  } else if (key == 2) {

    var w1 = 220;
    var h = 180;
    var x = 0;
    var y = 0;

    // How many cells fit in the canvas
    total = floor(width / w1) * floor(height / h);
    if (go == true) {
      snapshots[counter] = video.get();
      counter++;
      if (counter == total + 18) {
        counter = 0;
      }
    }


    for (var i = 0; i < snapshots.length; i++) {
      push();
      var col = map(mouseX, 0, width, 255, 150);
      var col1 = map(mouseY, 0, height, 100, 150)
      tint(0, col, col1, 20);
      //tint(255, 128);
      pop();
      imageMode(CORNER);
 filter(POSTERIZE, 3);
      var index = (i + frameCount) % snapshots.length;
      image(snapshots[index], x, y, w1, h);
      x = x + w1;
      if (x >= width) {
        x = 0;
        y = y + h;
      }
    }
  }
}


function calcWave(amplitude) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}


function renderWave() {
  // var col = map(mouseX, 0, width, 20, 70);
  for (let x = 0; x < yvalues.length; x++) {
    fill((x + abs(x * 2)) % 100, 100, 100, 50);
    stroke((x + abs(x * 2)) % 100, 100, 100, 50);
    ellipse(x * xspacing, (height / 2 + yvalues[x]) + 300, 2);
    line(width / 2, height / 2, x * xspacing, (height / 2 + yvalues[x]) + 300)

    push();
    scale(1.5);
    ellipse(x * xspacing, height / 2 + yvalues[x] - 200, 2);
    line(width / 2 - 240, height / 2 - 150, x * xspacing, height / 2 + yvalues[x] - 200);
    pop();
  }
}

function renderWave1() {
  // A simple way to draw the wave with an ellipse at each location
  // var col = map(mouseX, 0, width, 0, 100);
  for (let x = 0; x < yvalues.length; x++) {
    fill((x + abs(x * 2)) % 100, 100, 100, 10);
    stroke((x + abs(x * 2)) % 100, 100, 100, 40 - 10);
    ellipse(x * xspacing, height / 2 + yvalues[x] - 300, 2);
    line(width / 2, height / 2, x * xspacing, height / 2 + yvalues[x] - 300);
    push();
    scale(1.5);
    line(width / 2 - 240, height / 2 - 150, x * xspacing, height / 2 - 50 + yvalues[x])
    ellipse(x * xspacing, height / 2 - 50 + yvalues[x], 2);
    pop();
  }
}

function circleArt() {
  //  background(0);
  stroke((x + abs(x * 2)) % 100, 100, 100, 10);
  if (array > 0) {
    var x = int(random(300, 500));
    if (num < 370) {
      push();
      translate(mouseX, mouseY);
      rotate(radians(num));
      for (var i = 0; i < 10; i++) {
        line(0, 0, 80, 0);
      }
      pop();
    } else if (num >= 290) {
      stroke((x + abs(x * 2)) % 100, 100, 100, 10);
      num = random(1, 9);
    }
  }
  num += 10;
}

function mousePressed(){
  if (key == 0) {
    button.style("background-color: #4CAF50; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
    button1.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
      button2.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
  } else if (key == 1){
    button.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
    button1.style("background-color: #4CAF50; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
    button2.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
  }else if(key == 2){
    button1.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
    button2.style("background-color: #4CAF50; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
    button.style("background-color: #303030; border: none;  color: #00ff10; padding: 15px 32px;  font-size: 16px;");
  }
}

function saveScreenSaver() {
  save('Screen_saver.png');
}

function changeKey() {
  background(0);
  key = 0;
}

function changeKey1() {
  background(0);
  key = 1;
}

function changeKey2() {
  background(0);
  key = 2;
}
