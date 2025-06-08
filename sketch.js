let circles = []// Stores multiple graphic objects

class pictureCircle {
  constructor(x, y, radius, strokeColor, stroke, strokeweight, fillColor, dotColor, dotCount = 50, dotRadius = 3) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.stroke = stroke;
    this.strokeColor = strokeColor;
    this.strokeweight = strokeweight;
    this.fillColor = fillColor;
    this.dotColor = dotColor;
    this.dotCount = dotCount;
    this.dotRadius = dotRadius;

    this.angle = random(TWO_PI); 

    //Control dots' position between the biggest circle and second-biggest circle.
    const innerR = this.radius[this.radius.length - 2] + this.strokeweight;
    const outerR = this.radius[this.radius.length - 1] - this.strokeweight;

    this.dots = [];
    for (let i = 0; i < this.dotCount; i++) {
      let angle = random(TWO_PI);
      let r = random(innerR, outerR - this.dotRadius);
      let dx = this.x + r * cos(angle);
      let dy = this.y + r * sin(angle);
      this.dots.push({ x: dx, y: dy });
    }
  }

  drawCircle() {
    for (let i = this.radius.length - 1; i >= 0; i--) {
      strokeWeight(this.strokeweight);
      stroke(this.strokeColor[i]);
      fill(this.fillColor[i]);
      ellipse(this.x, this.y, this.radius[i] * 2);
    }
  }

  drawDots() {
    fill(this.dotColor);
    noStroke();
    for (let d of this.dots) {
      ellipse(d.x, d.y, this.dotRadius * 2);
    }
  }

  //Draw animate pointers
  drawRotatingPointer() {
    let outerR = this.radius[this.radius.length - 1];
    let r = outerR + 20;
    stroke('red');
    strokeWeight(3);
    noFill();
    let x1 = this.x;
    let y1 = this.y;
    let x2 = this.x + r * cos(this.angle);
    let y2 = this.y + r * sin(this.angle);
    line(x1, y1, x2, y2);
    this.angle += 0.02; 
  }

  drawRays() {
    stroke('orange');
    strokeWeight(2);
    let rayCount = 24;
    let rayLength = this.radius[1] - 5;
    for (let i = 0; i < rayCount; i++) {
      let angle = TWO_PI * i / rayCount;
      let x1 = this.x + this.radius[1] * cos(angle);
      let y1 = this.y + this.radius[1] * sin(angle);
      let x2 = x1 + rayLength * cos(angle);
      let y2 = y1 + rayLength * sin(angle);
      line(x1, y1, x2, y2);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pointerLayer = createGraphics(windowWidth, windowHeight);
  pointerLayer.angleMode(RADIANS);

  circles.push(new pictureCircle(
    300, 300,
    [10, 20, 40, 70],
    ['#F5204D', '#F5204D', '#F5204D', '#024E6B'],
    true,
    3,
    ['black','#6E6046', '#F367C6', '#FFF5F9'],
    '#E73940',
    100,
    3
  ));

  circles.push(new pictureCircle(
    500, 500,
    [10, 20, 40, 70],
    ['#F5204D', '#F5204D', '#F5204D', '#024E6B'],
    true,
    3,
    ['black','#6E6046', '#F367C6', '#FFF5F9'],
    '#E73940',
    100,
    3
  ));
  
}

function draw() {
  background('#024E6B');

  for (let circle of circles) {
    circle.drawCircle();
    circle.drawDots();
    circle.drawRays();
    circle.drawRotatingPointer();
  }   
}
