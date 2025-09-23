// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)

// Notes for students:
// 1) Add flap control in handleInput() (space / ↑ to jump)
// 2) Detect collisions between the bird and pipes → game over
// 3) Add scoring when you pass a pipe
// 4) (Stretch) Add start/pause/game-over states

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let score = 0;
let gameState = "start";

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 90; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 130; // gap height (try 100–160)
const PIPE_W = 60;

// Sound variables
let bgMusic;
let jumpSound;
let gameOverSound;
let scoreSound;

function preload() {
  bg = loadImage("backgroundimage.jpg");
  
  bgMusic = loadSound("audios/bgm.mp3");
  jumpSound = loadSound("audios/jump.mp3");
  gameOverSound = loadSound("audios/gameOver.mp3");
  scoreSound = loadSound("audios/score.mp3");
  
}

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(480, 640);
  noStroke();
  bird = new Bird(120, height / 2);
  // Start with one pipe so there’s something to see
  pipes.push(new Pipe(width + 40));
  
  // Set volume levels
  if (bgMusic) bgMusic.setVolume(0.5);
  if (jumpSound) jumpSound.setVolume(0.2);
  if (gameOverSound) gameOverSound.setVolume(0.5);
  if (scoreSound) scoreSound.setVolume(0.1);
}

function draw() {
  background(bg);

  if (gameState === "start") {
    drawStartScreen();
    
    // Start background music when game starts
    if (bgMusic && !bgMusic.isPlaying()) {
      bgMusic.loop();
    }
  } else if (gameState === "play") {
    runGame();
  } else if (gameState === "gameover") {
    drawGameOverScreen();
  }
}

// 1) read input (students: add flap control here)
//handleInput();

// 2) update world
function runGame() {
  bird.update();

  spawnCounter++;
  if (spawnCounter >= SPAWN_RATE) {
    pipes.push(new Pipe(width + 40));
    spawnCounter = 0;
  }

  // update + draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    // TODO (students): collision check with bird
    // If collision → stop the game or reset
    if (pipes[i].hits(bird)) {
      gameState = "gameover";
      
      // Play game over sound
      if (gameOverSound) gameOverSound.play();
    }

    if (pipes[i].passed === false)
      if (pipes[i].x + pipes[i].w < bird.pos.x) {
        score = score + 1;
        pipes[i].passed = true;
        
        //play score sound
        if (scoreSound) scoreSound.play();
      }

    // remove pipes that moved off screen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  // 3) draw bird last so it’s on top
  bird.show();
  fill(255);
  textSize(32);
  textAlign(CENTER, TOP);
  text(score, width / 2, 20);
}

function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Flappy Bird", width / 2, height / 2 - 40);
  textSize(18);
  text("Press space to start", width / 2, height / 2 - 5);
}

function drawGameOverScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(20);
  text("Score: " + score, width / 2, height / 2 - 5);
  text("Press space to restart", width / 2, height / 2 + 35);
}

function resetGame() {
  bird = new Bird(120, height / 2);
  pipes = [];
  pipes.push(new Pipe(width + 40));
  spawnCounter = 0;
  score = 0;
}

/* ----------------- Input ----------------- */
function keyPressed() {
  if (key === " ") {
    if (gameState === "start") {
      resetGame();
      gameState = "play";
    } else if (gameState === "play") {
      bird.flap();
      
      // Play jump sound
      if (jumpSound) jumpSound.play();
      
    } else if (gameState === "gameover") {
      resetGame();
      gameState = "play";
    }
  }
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16; // for collision + draw
    this.gravity = 0.45; // constant downward force
    this.flapStrength = -6.5; // negative = upward
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // instant upward kick
    this.vel.y = this.flapStrength;
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // keep inside canvas vertically (simple constraints)
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      gameState = "gameover";
      // TODO (students): treat touching the ground as game over
      // Play game over sound when hitting the ground
      if (gameOverSound) gameOverSound.play();
    }
  }

  show() {
    fill("#FFF330");
    circle(this.pos.x, this.pos.y, this.r * 2);
    // (Optional) add a small eye
    fill(40);
    circle(this.pos.x + 6, this.pos.y - 4, 4);
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    // randomize gap position
    const margin = 60;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP; // top of bottom pipe

    this.passed = false; // for scoring once per pipe
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(168, 255, 67);
    rect(this.x, 0, this.w, this.top); // top pipe
    rect(this.x, this.bottom, this.w, height - this.bottom); // bottom pipe
  }

  offscreen() {
    return this.x + this.w < 0;
  }

  // TODO (students): circle-rect collision (simple)
  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}
