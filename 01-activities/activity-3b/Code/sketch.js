// DM2008 — Activity 3b
// (One Function Wonder, 15 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);

  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).

  function myShape(x, y, s, c) {
    noFill();
    stroke(c);
    ellipse(x, y, s, s);
  }

  // TODO 2:
  // Call your function multiple times with different parameter values.


  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.
  for (let i = 0; i < 8; i++) {
    let y = 10 + i * 40;
    let size = 5 + i * 70;
    let r = random(255);
    let g = random(255);
    let b = random(255);
   myShape(200, y, size, color(r, g, b));
  }
}
function keyPressed(s) {
  saveCanvas("activity3b-image", "jpg");
}