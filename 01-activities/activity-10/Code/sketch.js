let colorBtn, sizeSlider, shapeSelect;
let shapeColor;
let shapeSize = 100; // initial size

function setup() {
  createCanvas(640, 400);
  colorMode(HSB); 
  noStroke();
  textFont("Helvetica, Arial, sans-serif");

  shapeColor = color(random(255), 255, 255);

  colorBtn = createButton("Change Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(() => {
    randomShapeSize();
    moveButtonRandomly();
  });

  createP("Size").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(0, 255, 150, 1);
  sizeSlider.position(15, 70);

  // Every time you click on the slider, its width randomly changes
  sizeSlider.mousePressed(resizeSliderRandomly);

  // Dropdown for shapes
  createP("Shape").position(0, 370).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 390);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");
}

function randomShapeSize() {
  shapeSize = random(20, 900);
}

function moveButtonRandomly() {
  let newX = random(0, width + 100);
  let newY = random(0, height + 50);
  colorBtn.position(newX, newY);
}

function resizeSliderRandomly() {
  let newWidth = random(50, 300); 
  sizeSlider.style("width", newWidth + "px");
}

function draw() {
  background(240);

  push();
  translate(width * 0.5, height * 0.5);

  let hueValue = sizeSlider.value();
  shapeColor = color(hueValue, 255, 255);
  fill(shapeColor);

  let s = shapeSize;

  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    ellipse(0, 0, s, s);
  } else if (choice === "rect") {
    rectMode(CENTER);
    rect(0, 0, s, s);
  } else if (choice === "triangle") {
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
  }

  pop();
}
