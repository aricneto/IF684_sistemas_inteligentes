// Seeking a Target (Seek)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/p1Ws1ZhG36g
// https://thecodingtrain.com/learning/nature-of-code/5.2-seek.html

// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

let vehicle;
let target;
let foodPresent = false;
let foodEaten = 0;

const CANVAS_X = 500;
const CANVAS_Y = 500;

function setup() {
  createCanvas(CANVAS_X, CANVAS_Y);
  vehicle = new Vehicle(CANVAS_X / 2, CANVAS_Y / 2);
}

function draw() {
  background(0);
  fill(255, 0, 0);
  noStroke();

  text("food eaten: " + foodEaten, 30, 30);

  if (!foodPresent) {
    target = createFood();
  }

  // draw food
  circle(target.x, target.y, 30);

  // measure distance
  let foodDistance = senseFood();

  // eat if close
  eatFood(foodDistance);
  


  let foodSensed = foodDistance < vehicle.observableDistance;

  smoothForce();

  if (foodSensed) {
    vehicle.seek(target);
  } else {
    vehicle.applyForce(smoothedForce);
  }

  vehicle.update();
  vehicle.show();
}

let lastDelta = 0;
let smoothedForce;
function smoothForce() {
  if (frameCount - lastDelta > 60) {
    lastDelta = frameCount;
    smoothedForce = createVector(getRandomNum() * 10, getRandomNum() * 10);
    
  }
  console.log("deltaTime: ", frameCount);
}

function getRandomNum() {
  let num = Math.random();
  if (num > 0.5) {
    return num;
  } else {
    return -num;
  }
}

function senseFood() {
  return dist(vehicle.pos.x, vehicle.pos.y, target.x, target.y);
}

function createFood() {
  let foodX = Math.random() * CANVAS_X;
  let foodY = Math.random() * CANVAS_Y;
  foodPresent = true;
  return createVector(foodX, foodY);
}

function eatFood(foodDistance) {
  // detect collision with food
  if (foodDistance < 5) {
    foodEaten++;
    foodPresent = false;
  }
}