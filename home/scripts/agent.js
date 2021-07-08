let step = 5;

class Agent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    let angle = noise(this.x / 100, this.y / 100) * 10;

    this.x += cos(angle) * step;
    this.y += sin(angle) * step;

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.reset();
    }

    strokeWeight(2);
    point(this.x, this.y);
  }

  reset(x, y) {
    if (!x || !y) {
      
      /*let pt = path[Math.floor(Math.random() * path.length)];
      
      this.x = pt.x + random(-20,20);
      this.y = pt.y + random(-20,20);*/
      
      this.x = random(width);
      this.y = random(height);
    } else {
      this.x = x;
      this.y = y;
    }
  }
}
