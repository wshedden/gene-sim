declare module 'neataptic' {
  // Represents a single node in the network
  interface Node {
    type: 'input' | 'hidden' | 'output';
    bias: number;
    squash: (x: number) => number;
    index?: number;
    layer?: number; // Optional for inferred layers
  }

  // Represents a single connection between nodes
  interface Connection {
    from: number; // Node ID
    to: number;   // Node ID
    weight: number;
    gater?: number; // Optional gater node ID
  }

  // Represents the JSON structure of a network
  interface NetworkJSON {
    nodes: Node[];
    connections: Connection[];
  }

  // Main Network class
  export class Network {
    constructor(input: number, output: number);

    activate(inputs: number[]): number[];
    train(
      data: { input: number[]; output: number[] }[],
      options?: {
        iterations?: number;
        error?: number;
        rate?: number;
        dropout?: number;
        momentum?: number;
      }
    ): { error: number; iterations: number };

    mutate(method: any): void;
    toJSON(): NetworkJSON;

    static crossOver(parent1: Network, parent2: Network): Network;
    static evolve(
      data: { input: number[]; output: number[] }[],
      options: {
        iterations?: number;
        populationSize?: number;
        mutationRate?: number;
        elitism?: number;
      }
    ): Network[];
  }

  // Architect namespace for building networks
  export namespace architect {
    export class Perceptron {
      constructor(...layers: number[]);
    }

    export class LSTM {
      constructor(...layers: number[]);
    }

    export class Liquid {
      constructor(input: number, pool: number, output: number, connections: number, gates: number);
    }
  }

  // Mutation and evolution methods
  export const Methods: {
    Mutation: {
      ADD_NODE: any;
      SUB_NODE: any;
      ADD_CONN: any;
      SUB_CONN: any;
      MOD_WEIGHT: any;
      MOD_BIAS: any;
      MOD_ACTIVATION: any;
      ADD_GATE: any;
      SUB_GATE: any;
      ADD_SELF_CONN: any;
      SUB_SELF_CONN: any;
      ADD_BACK_CONN: any;
      SUB_BACK_CONN: any;
    };
    Selection: {
      FITNESS_PROPORTIONATE: any;
      TOURNAMENT: any;
      RANDOM: any;
    };
  };

  // Miscellaneous utilities
  export const Config: {
    warnings: boolean;
  };
}
