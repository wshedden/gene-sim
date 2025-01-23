import { architect, Network } from 'neataptic';

export const createSimpleNeuralNetwork = (): Network => {
  // Create a perceptron with 2 input neurons, 3 hidden neurons, and 1 output neuron
  const network = new architect.Perceptron(2, 3, 1) as Network;

  return network;
};