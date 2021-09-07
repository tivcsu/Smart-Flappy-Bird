class NeuralNetwork {
  constructor(i, h, o) {
    if (i instanceof NeuralNetwork) {
      this.input_nodes = i.input_nodes;
      this.hidden_nodes = i.hidden_nodes;
      this.output_nodes = i.output_nodes;

      this.weights_ih = i.weights_ih.copy();
      this.weights_ho = i.weights_ho.copy();

      this.bias_h = i.bias_h.copy();
      this.bias_o = i.bias_o.copy();
    } else {
      this.input_nodes = i;
      this.hidden_nodes = h;
      this.output_nodes = o;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize();
      this.bias_o.randomize();
    }
  }

  predict(input_array) {
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output.toArray();
  }

  copy() {
    return new NeuralNetwork(this);
  }

  mutate(rate){
    function mutate(val){
      if(Math.random() < rate){
        return val + randomGaussian(0,0.1);
      } else{
        return val;
      }
    }
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }
}
function sigmoid(x){
  return 1 / (1 + Math.exp(-x));
}
