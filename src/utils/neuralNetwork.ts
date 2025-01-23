import { Network, architect } from 'neataptic';

export const createSimpleNeuralNetwork = () => {
  // Create a simple feedforward neural network with 2 input neurons, 3 hidden neurons, and 1 output neuron
  const network = new architect.Perceptron(2, 3, 1);
  return network;
};