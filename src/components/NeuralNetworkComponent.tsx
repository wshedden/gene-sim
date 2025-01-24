import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { CustomNetwork } from '../utils/CustomNetwork';

class VisualNode {
  index: number;
  layer: number;
  x: number;
  y: number;

  constructor(index: number, layer: number, x: number, y: number) {
    this.index = index;
    this.layer = layer;
    this.x = x;
    this.y = y;
  }
}

class VisualNeuralNetwork {
  nodes: VisualNode[];
  layerSpacing: number;
  nodeSpacing: number;

  constructor(network: CustomNetwork, width: number, height: number) {
    const layers = network.toJSON().nodes.reduce((acc: any, node: any) => {
      if (!acc[node.layer]) acc[node.layer] = [];
      acc[node.layer].push(node);
      return acc;
    }, {});

    const layerKeys = Object.keys(layers);
    const layerCount = layerKeys.length;
    this.layerSpacing = width / (layerCount + 1);
    this.nodeSpacing = height / (Math.max(...layerKeys.map(key => layers[key].length)) + 1);

    this.nodes = network.toJSON().nodes.map((node: any) => {
      const x = (node.layer + 1) * this.layerSpacing + 50;
      const y = (node.indexInLayer) * this.nodeSpacing + 50;
      console.log(`Node ${node.index}: (${x}, ${y})`);
      return new VisualNode(node.index, node.layer, x, y);
    });
  }

  drawNodes(svg: any, nodeRadius: number) {
    this.nodes.forEach(node => {
      svg.append('circle')
        .attr('cx', node.x)
        .attr('cy', node.y)
        .attr('r', nodeRadius)
        .attr('fill', 'steelblue');
    });
  }

  drawConnections(svg: any, network: CustomNetwork) {
    const nodesMap = this.nodes.reduce((acc, node) => {
      acc[node.index] = node;
      return acc;
    }, {});

    network.toJSON().nodes.forEach((node: any) => {
      node.weights.forEach((weight: any) => {
        const sourceNode = nodesMap[node.index];
        const targetNode = nodesMap[weight.targetIndex];
        if (sourceNode && targetNode) {
          svg.append('line')
            .attr('x1', sourceNode.x)
            .attr('y1', sourceNode.y)
            .attr('x2', targetNode.x)
            .attr('y2', targetNode.y)
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
        }
      });
    });
  }
}

interface NeuralNetworkComponentProps {
  network: CustomNetwork | null;
}

const NeuralNetworkComponent: React.FC<NeuralNetworkComponentProps> = ({ network }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (network && d3Container.current) {
      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', 300)
        .attr('height', 300);

      // Clear previous SVG content
      svg.selectAll('*').remove();

      const visualNetwork = new VisualNeuralNetwork(network, 200, 200);

      // Draw connections
      visualNetwork.drawConnections(svg, network);

      // Draw nodes
      visualNetwork.drawNodes(svg, 10);
    }
  }, [network]);

  return <div ref={d3Container} />;
};

export default NeuralNetworkComponent;