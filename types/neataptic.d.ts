declare module 'neataptic' {

  // Main Network class
  export class Network {
    constructor(...layers: number[]) {
      console.log("Creating network with layers:", layers);
    }
  }
}