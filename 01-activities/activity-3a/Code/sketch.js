// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors (or other values)
//    You can make more than one array if you'd like
// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors
let palette = ["#f06449", "#009988", "#3c78d8", "#ffeb3b"];

// 2. A variable to track the current index
let currentIndex = 0;

// Added words array
let s = ["the", "quick", "brown", "fox"];

let items = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
  textSize(24);
}

function draw() {
  background(220);

  // loop
  for (let i = 0; i < items.length; i++) {
    fill(items[i].color);
    text(items[i].word, items[i].x, items[i].y);
  }
}

// 4. Change the index when mouse is pressed
function mousePressed() {
  // Advance to the next item
  currentIndex++;
  // Reset to 0 when we reach the end
  if (currentIndex >= palette.length) currentIndex = 0;

  items.push({
    x: mouseX,
    y: mouseY,
    word: s[currentIndex],
    color: palette[currentIndex],
  });

  if (items.length > 20) {
    items.splice(0, 1);
  }

  // Log in the console to check
  console.log(
    "Index:",
    currentIndex,
    "Word:",
    s[currentIndex],
    "Color:",
    palette[currentIndex]
  );
}

/* 
TODOs for students:
1. Replace colors with your own data (positions, text, sizes, etc).
2. Try mousePressed() instead of keyPressed().
3. Use push() to add new items, or splice() to remove them, then check how the sketch adapts.
4. Try looping through an array to visualize all the items within it instead of accessing one item at a time.
*/
