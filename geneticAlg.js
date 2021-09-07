
function nextGeneration(){
  calculateFitness();
  for(let i = 0; i< TOTAL; i++){
    birds[i] = pickOne();
  }
  savebirds = [];
}

function pickOne(){
  var index = 0;
  var r = random(1);
  saveBirds[index].fitness;
  while(r > 0){
    r = r - saveBirds[index].fitness;
    index++;
  }
  index--;
  console.log(saveBirds[index].fitness);
  let bird = saveBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

function calculateFitness(){
  let sum = 0;
  for(let bird of saveBirds){
    sum += bird.score;
  }
  for(let bird of saveBirds){
    bird.fitness = bird.score / sum;
  }
}
