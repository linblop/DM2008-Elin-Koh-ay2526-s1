let s = 100
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220,60,10);
    s = map(mouseX,0,width,20,100);

  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      ellipse(i * 100, j * 100, s);
    }
  }
}

function keyPressed(s) {
  saveCanvas("activity1b-image", "jpg");
}