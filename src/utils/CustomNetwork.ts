// src/utils/CustomNetwork.ts
import { Network } from 'neataptic';

class Node {
    // Has index, layer, type, weight list, bias
    index: number;
    layer: number;
    type: string;
    weights: number[];
    bias: number;

    constructor(index: number, layer: number, type: string, weights: number[], bias: number) {
        this.index = index;
        this.layer = layer;
        this.type = type;
        this.weights = weights;
        this.bias = bias;
    }
}

export class CustomNetwork extends Network {
    layers: number[];
    nodes: Node[];
  constructor(...layers: number[]) {
    super(...layers);
    this.layers = layers;
    this.nodes = [];
    console.log("Creating network with layers:", layers);


    // For each layer create the nodes
    for (let i = 0; i < layers.length; i++) {
      for (let j = 0; j < layers[i]; j++) {
        const nodeType = i === 0 ? 'input' : i === layers.length - 1 ? 'output' : 'hidden';
        const node = new Node(i * layers[i] + j, i, nodeType, [], 0);
        this.nodes.push(node);
        console.log(`Created node: ${JSON.stringify(node)}`);
      }
    }
  }

  toJSON() {
    return {
      layers: this.layers,
      nodes: this.nodes.map(node => ({
        index: node.index,
        layer: node.layer,
        type: node.type,
        weights: node.weights,
        bias: node.bias
      }))
    };
  }
}

export const createCustomNeuralNetwork = (): CustomNetwork => {
  // Create a custom network with 2 input neurons, 3 hidden neurons, and 1 output neuron
  const network = new CustomNetwork(2, 3, 1);

  return network;
};