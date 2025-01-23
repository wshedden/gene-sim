import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Network } from 'neataptic';

interface NeuralNetworkComponentProps {
  network: Network | null;
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

      // Define the layout and rendering logic for the neural network
      const layers = network.toJSON().nodes.reduce((acc: any, node: any) => {
        if (!acc[node.layer]) acc[node.layer] = [];
        acc[node.layer].push(node);
        return acc;
      }, {});

      const layerKeys = Object.keys(layers);
      const layerCount = layerKeys.length;
      const nodeRadius = 10;
      const layerSpacing = 300 / (layerCount + 1);
      const nodeSpacing = 300 / (Math.max(...layerKeys.map(key => layers[key].length)) + 1);

      // Draw connections
      network.toJSON().connections.forEach((connection: any) => {
        const fromNode = network.toJSON().nodes.find((node: any) => node.index === connection.from);
        const toNode = network.toJSON().nodes.find((node: any) => node.index === connection.to);

        if (fromNode && toNode) {
          svg.append('line')
            .attr('x1', (fromNode.layer + 1) * layerSpacing)
            .attr('y1', (layers[fromNode.layer].indexOf(fromNode) + 1) * nodeSpacing)
            .attr('x2', (toNode.layer + 1) * layerSpacing)
            .attr('y2', (layers[toNode.layer].indexOf(toNode) + 1) * nodeSpacing)
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
        }
      });

      // Draw nodes
      layerKeys.forEach((layerKey, layerIndex) => {
        const layer = layers[layerKey];
        layer.forEach((node: any, nodeIndex: number) => {
          svg.append('circle')
            .attr('cx', (layerIndex + 1) * layerSpacing)
            .attr('cy', (nodeIndex + 1) * nodeSpacing)
            .attr('r', nodeRadius)
            .attr('fill', 'steelblue');
        });
      });
    }
  }, [network]);

  return <div ref={d3Container} />;
};

export default NeuralNetworkComponent;