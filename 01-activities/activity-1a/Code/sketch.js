function setup() {
}
function draw() {
  createCanvas(windowWidth, windowHeight);
  background('#FF5900');
  strokeWeight(0)
  square(windowWidth/2-150,windowHeight/2-150,50)
  square(windowWidth/2-150,windowHeight/2-100,50)
  square(windowWidth/2-99,windowHeight/2-200,50)
  square(windowWidth/2-50,windowHeight/2-150,50)
  square(windowWidth/2-50,windowHeight/2-100,50)
   square(windowWidth/2+150,windowHeight/2-150,50)
  square(windowWidth/2+150,windowHeight/2-100,50)
  square(windowWidth/2+99,windowHeight/2-200,50)
  square(windowWidth/2+50,windowHeight/2-150,50)
  square(windowWidth/2+50,windowHeight/2-100,50)
  square(windowWidth/2,windowHeight/2-100,50)
  ellipse(windowWidth/2-60,windowHeight/2+5,50,70)
  ellipse(windowWidth/2+80,windowHeight/2+5,50,70)
   rect(windowWidth/2-15,windowHeight/2+22,50,10)
  square(windowWidth/2-100,windowHeight/2+200,50)
  square(windowWidth/2-100,windowHeight/2+150,50)
   square(windowWidth/2+100,windowHeight/2+200,50)
   square(windowWidth/2+100,windowHeight/2+150,50)
  rect(windowWidth/2-50,windowHeight/2+150,200,50)
     square(windowWidth/2-150,windowHeight/2+100,50)
      square(windowWidth/2+150,windowHeight/2+100,50)
  square(windowWidth/2-200,windowHeight/2+50,50)
  square(windowWidth/2-200,windowHeight/2-50,50)
  square(windowWidth/2-200,windowHeight/2,50)
     square(windowWidth/2+200,windowHeight/2+50,50)
     square(windowWidth/2+200,windowHeight/2-50,50)
     square(windowWidth/2+200,windowHeight/2,50)
  square(windowWidth/2+200,windowHeight/2+150,50)
  square(windowWidth/2+250,windowHeight/2+150,50)
  square(windowWidth/2+300,windowHeight/2+100,50)
  square(windowWidth/2+350,windowHeight/2+150,50)

}

function keyPressed(s) {
  saveCanvas("activity1a-image", "jpg");
}