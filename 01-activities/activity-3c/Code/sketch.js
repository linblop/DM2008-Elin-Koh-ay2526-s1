// DM2008 — Activity 3c
// (Painting App, 50 min)

// 1) Palette + size
const palette = ["#f06449", "#009988", "#3c78d8", "#eeeeee"];
let colorIndex = 0;
let sizeVal = 20;

// 2) Brush registry (array of functions)
const brushes = [brushCircle, brushSquare, brushStreak];
let currentBrush = 0; // 0, 1, or 2
let eraserMode = false;

function setup() {
  createCanvas(600, 600);
  background(255, 249, 161);
  rectMode(CENTER);
}

function draw() {
  // paint only while mouse is held
  if (mouseIsPressed) {
    const col = eraserMode ? color(240) : palette[colorIndex];
    brushes[currentBrush](mouseX, mouseY, col, sizeVal);
  }
}

// 3) Brush functions (students can customize/extend)
function brushCircle(x, y, c, s) {
  noStroke();
  for (let i = 0; i < 8; i++) {
    let alpha = 40;
    fill(red(c), green(c), blue(c), alpha);
    let r = s + i * 3;
    ellipse(x, y, r);
  }
  fill(c);
  ellipse(x, y, s * 0.6);
}

function brushSquare(x, y, c, s) {
  push();
  translate(x, y);
  noStroke();
  fill(c);
  rect(0, 0, s, s);
  pop();
}

let prevX = null;
let prevY = null;

function brushStreak(x, y, c, s) {
  stroke(c);
  strokeWeight(s * 0.3);
  strokeCap(ROUND);

  if (prevX !== null) {
    line(prevX, prevY, x, y);
  }

  prevX = x;
  prevY = y;
}

// 4) Brush UI: select brush, cycle color, change size, clear
function keyPressed() {
  switch (key) {
    case "1":
      currentBrush = 0; // circle
      break;
    case "2":
      currentBrush = 1; // square
      break;
    case "3":
      currentBrush = 2; // streak
      break;
  }
  if (key == "C" || key == "c") {
    colorIndex = (colorIndex + 1) % palette.length; // cycle color
  }
  if (key == "+" || key == "=") {
    sizeVal += 4;
  }
  if (key == "-" || key == "_") {
    sizeVal = max(4, sizeVal - 4);
  }
  if (key == "X" || key == "x") {
    background(240); // clear canvas
  }
  // TODO: add an 'E' (eraser) mode by painting with background color
  // e.g., if eraserMode, use color(240) instead of palette[colorIndex]
  if (key == "E" || key == "e") {
    eraserMode = !eraserMode;
    console.log("Eraser:", eraserMode);
  }
}
