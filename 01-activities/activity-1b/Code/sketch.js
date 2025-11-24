// DM2008
// Activity 1b (Georg Nees)

let x;
let y;
let w;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
}

function draw() {
  if (mouseIsPressed) {
   let x = mouseX;
    let y = mouseY;
  w = random(10, 80);

  // background(240,40);

  stroke(random(255), random(255), random(255));
  strokeWeight(random(0.5, 2));
  noFill();
  rect(x, y, w, w);
}
}

function keyPressed(s) {
  saveCanvas("activity1b-image", "jpg");
}