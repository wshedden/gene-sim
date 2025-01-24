// src/utils/CustomNetwork.ts
import { Network } from 'neataptic';

class Node {
    // Has index, layer, type, weight list, bias
    index: number;
    layer: number;
    indexInLayer: number;
    type: string;
    weights: { targetIndex: number, weight: number }[];
    bias: number;

    constructor(index: number, layer: number, indexInLayer: number, type: string, weights: { targetIndex: number, weight: number }[], bias: number) {
        this.index = index;
        this.layer = layer;
        this.indexInLayer = indexInLayer;
        this.type = type;
        this.weights = weights;
        this.bias = bias;
    }

    addWeight(targetIndex: number, weight: number) {
        this.weights.push({ targetIndex, weight });
    }
}

export class CustomNetwork extends Network {
    layers: number[];
    nodes: Node[];

    constructor(...layers: number[]) {
        super(...layers);
        this.layers = layers;
        this.nodes = [];

        // Create nodes for each layer
        let nodeIndex = 0;
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            for (let j = 0; j < layers[layerIndex]; j++) {
                const nodeType = layerIndex === 0 ? 'input' : layerIndex === layers.length - 1 ? 'output' : 'hidden';
                const node = new Node(nodeIndex++, layerIndex, j, nodeType, [], 0);
                this.nodes.push(node);
            }
        }

        // Initialize weights for connections between layers
        this.initializeWeights();
    }

    initializeWeights() {
        for (const node of this.nodes) {
            if (node.layer < this.layers.length - 1) {
                const nextLayerNodes = this.nodes.filter(n => n.layer === node.layer + 1);
                for (const targetNode of nextLayerNodes) {
                    const weight = Math.random() * 2 - 1; // Random weight for example
                    node.addWeight(targetNode.index, weight);
                }
            }
        }
    }

    toJSON() {
        return {
            layers: this.layers,
            nodes: this.nodes.map(node => ({
                index: node.index,
                layer: node.layer,
                indexInLayer: node.indexInLayer,
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