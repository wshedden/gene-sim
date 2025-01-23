// typings/neataptic.d.ts
declare module 'neataptic' {
    export class Network {
      constructor(input: number, output: number);
      static crossOver(parent1: Network, parent2: Network): Network;
      mutate(method: any): void;
      activate(inputs: number[]): number[];
      train(data: { input: number[]; output: number[] }[]): void;
      toJSON(): any;
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
  
    export const Methods: {
      Mutation: {
        MOD_WEIGHT: any;
        [key: string]: any;
      };
    };

    export namespace architect {
      export class Perceptron {
        constructor(...layers: number[]);
      }
    }
  }
  