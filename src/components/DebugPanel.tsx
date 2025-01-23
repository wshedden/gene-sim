import React from 'react';
import { Network } from 'neataptic';

interface DebugPanelProps {
  network: Network | null;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ network }) => {
  if (!network) {
    return <div>No network data available</div>;
  }

  const networkData = network.toJSON();
  const conciseData = {
    nodes: networkData.nodes.length,
    connections: networkData.connections.length,
    layers: networkData.nodes.reduce((acc: any, node: any) => {
      if (!acc[node.layer]) acc[node.layer] = 0;
      acc[node.layer]++;
      return acc;
    }, {}),
  };

  return (
    <div>
      <h3>Debug Panel</h3>
      <pre>{JSON.stringify(conciseData, null, 2)}</pre>
    </div>
  );
};

export default DebugPanel;