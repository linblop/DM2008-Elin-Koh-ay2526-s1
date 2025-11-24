let say;
let rec;
let durationMillis = 5000;
let currentColor;
let words = ["red", "blue", "green", "yellow", "purple", "orange"];
let currentWord = "";
let currentWordColor;
let score = 0;
let roundStartTime;
let correctInRound = 0;
let currentRound = 1;
let isRunning = false;
let startTime;
let musicStarted = false;
let angle = 0;
let wordAnswered = false;
let wordScale = 1;
let scaleDirection = 1;
let lastFlashTime = 0;
let flashInterval = 200;
let gameOver = false;
let round3StartTime;

// NEW STATE VARIABLE
let gameState = "start"; // "start", "landing", "playing", "ending"
let endScreenStartTime = 0;

function preload() {
  dog = loadImage("dog.png");
  bgMusic = loadSound("bgMusic.mp3");
}

const colors = {
  red: "#FF4444",
  blue: "#4444FF",
  green: "#44FF44",
  yellow: "#FFFF44",
  purple: "#F044FF",
  orange: "#FF8844",
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  say = new p5.Speech();
  rec = new p5.SpeechRec();
  rec.continuous = true;
  rec.interimResults = true;
  rec.onResult = showResult;
  rec.start();

  textAlign(CENTER, CENTER);
  noStroke();
  newWord();

  startTime = millis();
  background(0);

  if (bgMusic) bgMusic.setVolume(0.3);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // === STATE MACHINE ===
  if (gameState === "start") {
    drawStartScreen();
    return;
  }

  if (gameState === "landing") {
    drawLandingScreen();
    if (millis() - startTime >= durationMillis) {
      gameState = "playing";
      roundStartTime = millis();
      newWord();
      if (bgMusic && !musicStarted) {
        bgMusic.loop();
        musicStarted = true;
      }
    }
    return;
  }

  if (gameState === "ending") {
    drawEndingScreen();

    // Show ending screen for 15 seconds before restarting
    if (millis() - endScreenStartTime > 15000) {
      resetGame();
    }
    return;
  }

  if (gameState !== "playing") return;

  // === GAMEPLAY ===

  // Check if game is over (round 3 time limit reached)
  if (currentRound === 3 && !gameOver) {
    let round3Elapsed = millis() - round3StartTime;
    if (round3Elapsed >= 120000) {
      gameOver = true;
      if (bgMusic) bgMusic.stop();
      gameState = "ending";
      endScreenStartTime = millis();
    }
  }

  // Background handling
  if (currentRound === 3) {
    let currentTime = millis();
    if (currentTime - lastFlashTime > flashInterval) {
      let colorKeys = Object.keys(colors);
      let randomColorKey = random(colorKeys);
      currentColor = colors[randomColorKey];
      lastFlashTime = currentTime;
    }
    background(currentColor);
  } else {
    background(currentColor);
  }

  // Timer logic
  let elapsed = millis() - roundStartTime;
  let timeLeft = durationMillis - elapsed;
  if (timeLeft < 0) timeLeft = 0;

  // Timer bar
  fill(255);
  rect(width / 2 - 300, 50, map(timeLeft, 0, durationMillis, 0, 500), 20);

  // Timeout → -1 point
  if (timeLeft <= 0 && !wordAnswered) {
    score -= 1;
    wordAnswered = true;
    setTimeout(() => {
      roundStartTime = millis();
      wordAnswered = false;
    }, 100);
  }

  // Word animation
  if (currentRound >= 2) {
    let pulseSpeed = currentRound === 2 ? 2 : 4;
    wordScale += scaleDirection * pulseSpeed;
    if (wordScale >= 10 || wordScale <= 0.2) scaleDirection *= -1;
  } else {
    wordScale = 1;
  }

  // Word display
  push();
  translate(width / 2, height / 2);
  scale(wordScale);
  fill(currentWordColor);
  textSize(100);
  text(currentWord, 0, 0);
  pop();

  // Points & Round
  fill(255);
  textSize(24);
  textAlign(LEFT, CENTER);
  text("Points: " + score, 50, 30);
  textAlign(RIGHT, CENTER);
  text("Round: " + currentRound, width - 50, 30);
  textAlign(CENTER, CENTER);

  // Dog animation for round 2 & 3
  if (currentRound >= 2) {
    push();
    let rotationSpeed = currentRound === 2 ? 4 : 15;
    let dogSize = currentRound === 2 ? 800 : 2000;
    rotate(angle);
    image(dog, windowWidth / 8, windowHeight + 200, dogSize, dogSize);
    angle += rotationSpeed;
    pop();
  }
}

function drawStartScreen() {
  background(0);
  fill(255);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("Say 'pineapple' to start", width / 2, height / 2);
}

function drawLandingScreen() {
  fill(255);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("Say the colour of the word", width / 2, height / 2);
}

function drawEndingScreen() {
  background(0);

  push();
  translate(width / 2, height / 2 - 50);
  rotate(angle);
  image(dog, 0, 0, 300, 300);
  angle += 4;
  pop();

  fill(255);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("Congrats", width / 2, height / 2 + 180);

  textSize(20);
  text("Final Score: " + score, width / 2, height / 2 + 215);
}

function showResult() {
  let mostRecent = rec.resultString.split(" ").pop().toLowerCase();
  print(mostRecent);

  // === START SCREEN LISTENER ===
  if (gameState === "start" && mostRecent.includes("pineapple")) {
    gameState = "landing";
    startTime = millis();
    return;
  }

  // === IGNORE INPUTS OUTSIDE PLAY ===
  if (gameState !== "playing" || gameOver) return;
  if (wordAnswered) return;

  if (Object.keys(colors).includes(mostRecent)) {
    let spokenColor = mostRecent;
    let actualColor = Object.keys(colors).find(
      (key) => colors[key] === currentWordColor
    );

    if (spokenColor === actualColor) {
      score += 1;
      wordAnswered = true;
      correctInRound++;

      if (correctInRound >= 8) {
        if (currentRound < 3) {
          currentRound++;
          correctInRound = 0;

          if (currentRound === 2) {
            durationMillis = 4000;
            if (bgMusic) {
              bgMusic.rate(1.2);
              bgMusic.setVolume(0.5);
            }
          } else if (currentRound === 3) {
            durationMillis = 3000;
            round3StartTime = millis();
            if (bgMusic) {
              bgMusic.rate(1.5);
              bgMusic.setVolume(2.0);
            }
          }
        }
      }

      setTimeout(() => {
        newWord();
        roundStartTime = millis();
      }, 100);
    } else {
      score -= 1;
      setTimeout(() => {
        roundStartTime = millis();
        wordAnswered = false;
      }, 100);
    }
  }
}

function newWord() {
  wordAnswered = false;
  let word = random(words);
  let colorKeys = Object.keys(colors);
  let colorKey = random(colorKeys);
  while (colorKey === word) colorKey = random(colorKeys);

  currentWord = word;
  currentWordColor = colors[colorKey];
  if (currentRound < 3) {
    currentColor = colors[random(colorKeys)];
  }

  roundStartTime = millis();
}

function resetGame() {
  gameState = "start";
  currentRound = 1;
  score = 0;
  correctInRound = 0;
  durationMillis = 5000;
  gameOver = false;
  musicStarted = false;
  if (bgMusic) bgMusic.stop();
  startTime = millis();
}

function keyPressed() {
  if (key === "f") fullscreen(true);
  if (key === "Escape") fullscreen(false);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
