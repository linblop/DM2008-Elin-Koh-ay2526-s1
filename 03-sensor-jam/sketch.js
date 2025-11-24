let port; // Serial Communication port
let connectBtn;

let sensorVal, circleSize;
let bgopacity = 100;
let dogimg;
let imageSize;
let angle = 0;

function preload() {
  dog = loadImage('/assets/dog.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);
  port = createSerial(); // creates the Serial Port

  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(255);
  // ellipse(width / 2, height / 2, circleSize);
  translate(width / 2, height / 2);
  rotate(angle);
  image(dog, 0, 0, imageSize, imageSize);

  angle = angle + 8;
  imageSize = map(sensorVal, 5, 100, 0, 1000);

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      console.log(sensorVal);
      // Update circle's size with sensor's data
      // Reduce delay() value in Ardiuno to get smoother changes
      // circleSize = sensorVal;
    }
  }
}

// DO NOT REMOVE THIS FUNCTION
function connectBtnClick(e) {
  // If port is not already open, open on click,
  // otherwise close the port
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
    e.target.innerHTML = "Disconnect Arduino";
    e.target.classList.add("connected");
  } else {
    port.close();
    e.target.innerHTML = "Connect to Arduino";
    e.target.classList.remove("connected");
  }
}
