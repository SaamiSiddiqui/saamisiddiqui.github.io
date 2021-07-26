let str = "Saami";
let pg;
let agents = [];
let pathAgents = [];

// position and dimensions of the bounds
let x = 20;
let y = 20;
let w = 200;
let h = 60;

let path;
let font;
function preload() {
  font = loadFont("home/FreeSans.otf");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*0.4);
  
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  
  rectMode(CENTER);

  pg = createGraphics(width, height);
  pg.noStroke();
  pg.rectMode(CENTER);

  x = width / 2;
  y = height / 2;
  w = width / 1.2;
  h = height / 1.2;

  textFont(font);
  pg.textFont(font);

  // calculate minimum size to fit width
  let minSizeW = (12 / textWidth(str)) * w;
  // calculate minimum size to fit height
  let minSizeH = (12 / (textDescent() + textAscent())) * h;
  console.log(minSizeW, minSizeH);
  pg.textSize(min(minSizeW, minSizeH));
  textSize(min(minSizeW, minSizeH));

  path = font.textToPoints(str, x - textWidth(str) / 2, y + textDescent(), textSize(), {
    sampleFactor: 0.2,
  });

  for (let pt in path) {
    /*pg.stroke(0, 0, 0);
    pg.strokeWeight(2);
    pg.point(path[pt].x, path[pt].y);*/

    agents[pt] = new Agent(random(width), random(height));
  }

  pg.noStroke();
  pg.fill(255);
  pg.text(str, x - pg.textWidth(str) / 2, y + textDescent());
}

function draw() {
  blendMode(ADD);
  background(255, 10);
  blendMode(BLEND);

  let bounds = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  let qt = new QuadTree(bounds, 5);

  /*noFill();
  strokeWeight(1);
  stroke(255,0,0);
  rect(x,y,w,h);*/

  /*stroke(255,0,0);
  strokeWeight(10);
  point(x,y);
  point(x,y+textDescent());*/

  for (let agent in agents) {
    agents[agent].update();

    let p = new Point(agents[agent].x, agents[agent].y, agents[agent]);
    qt.insert(p);
  }

  for (i = 0; i < path.length; i += 1) {
    let pnt = path[i];
    newx = pnt.x + random(-10, 10);
    newy = pnt.y + random(-10, 10);

    point(newx, newy);

    let zone = new Rectangle(pnt.x, pnt.y, 10,10);
    dead = qt.query(zone);

    for (let p in dead) {
      dead[p].userData.reset();
    }
  }

  /*let r = font.textBounds(str, x - w / 2, y + textDescent(),textSize());
  let zone = new Rectangle(r.x+r.w/2,r.y+r.h/2,r.w/2,r.h/2);
  dead = qt.query(zone);
  
  for (let p in dead) {
    dead[p].userData.reset();
  }*/

  //noFill();
  //rect(r.x+r.w/2,r.y+r.h/2,r.w,r.h);
  image(pg, 0, 0);
}
