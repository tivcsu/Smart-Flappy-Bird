const TOTAL = 500;
var birds = [];
var saveBirds = [];
var pipes = [];
//frame counter - when to add a pipe
let counter = 0;
let speedSlider;
let mutation;
let pipesPassed = 0;
let generation = 1;
let highscore = 0;
let birdsAlive = TOTAL;
let mutationRate;

function preload() {
  bg = loadImage('backround.png');
  skin = loadImage('bird.png');
  pipe = loadImage('body.png');
}

function setup() {
  createCanvas(640, 480);
  speedSlider = createSlider(1,100,1);
  mutation = createSlider(1,100,10);
  //Creating a population of birds
  for (let i = 0; i<TOTAL; i++){
  birds[i] = new Bird();
  }
}

function draw()  {
  for(let n = 0;n< speedSlider.value(); n++){

  if (counter % 75 == 0) {
    pipes.push(new Pipe());
  }
    counter++;

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    for (let j = birds.length - 1; j >= 0 ; j--){
    if (pipes[i].hits(birds[j])){
      saveBirds.push(birds.splice(j, 1)[0]);
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      pipesPassed++;
      if(pipesPassed > highscore){
        highscore = pipesPassed;
      }
    }
  }

  for (let i = birds.length - 1; i >= 0 ; i--){
  if (birds[i].offScreen()){
    saveBirds.push(birds.splice(i, 1)[0]);
    }
  }

  for (let bird of birds){
  bird.think(pipes);
  bird.update();
  }
if(birds.length === 0){
  counter = 0;
  nextGeneration();
  generation++;
  pipes = [];
  pipesPassed = 0;
  birdsAlive = TOTAL;
  }
}
image(bg, 0, 0, 640, 520);

for (let bird of birds){
  bird.show();
}
for(let pipe of pipes){
  pipe.show();
}
textSize(40);
fill(0);
text(pipesPassed, 320,45);

textSize(20);
fill(0);
text("Speed:", 380, 80);
speedSlider.position(460,70);
text(speedSlider.value() + "x", 590, 80);

text("Mutation Rate:", 315, 120);
mutation.position(460,110);
text(mutation.value()/100, 590, 120);

textSize(25);
fill(0);
text("Birds alive: " + birds.length, 400, 390);


textSize(25);
fill(0);
text("Generation: " + generation, 400, 420);

textSize(25);
fill(0);
text("Highscore: " + highscore, 400, 450);
}
