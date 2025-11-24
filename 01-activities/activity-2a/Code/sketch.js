function setup() {
  createCanvas(400, 400);
   background(30,50,255);
  strokeColor = color(100)
}

function draw() {
  
  //lines to split up canvas
  stroke(strokeColor)
}

function keyPressed(){
  switch (key){
    case"1":
      background(200,255,0)
      noFill(0)
      ellipse(100,100,100)
      strokeColor = color(255,0,0)
      break;
    case"2":
      fill(255)
      background(0,50,25)
      ellipse(300,100,100)
      break;
    case"3":
      noFill(0)
      background(150,50,120)
      ellipse(300,300,100)
      break;
    case"4":
      fill(255)
      background(200,40,60)
      ellipse(100,300,100)
      break;
    default:
      background(100,50,50)
      ellipse(100,300,100)
  }
}