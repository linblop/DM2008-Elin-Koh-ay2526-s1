// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];

function setup() {
  createCanvas(400, 400);

  // Step 1: create two Ball objects
  balls.push(new Ball(50, 50));
  balls.push(new Ball(50, 50));
  balls.push(new Ball(50, 50));
  balls.push(new Ball(50, 50));
}

function draw() {
  background(230);

  // update & display each ball
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].show();
    // check collision with others
    balls[i].checkCollision(balls);
  }
}

// Step 3: check collisions
// Use dist() between ball centers
// Trigger feedback (color, bounce, etc.)

class Ball {
  constructor(x, y) {
    this.r = 50;
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 10), random(5, 5));
  }

  move() {
    this.pos.add(this.vel);
    // wrap around edges
    if (this.pos.x < this.r || this.pos.x > width-this.r) (this.vel.x *=-1) 
    if (this.pos.y < this.r || this.pos.y > width-this.r) (this.vel.y *=-1) 
    }

  show() {
    fill(100, 180, 220);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  // Step 4: Add a method to checkCollision(others)
  // Use dist() and respond visually
  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      // Make sure we do not compare the ball to itself
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          push();
          fill(50);
          ellipse(this.pos.x, this.pos.y, this.r * 2); // highlight on collision
          pop();
        }
      }
    }
  }
}