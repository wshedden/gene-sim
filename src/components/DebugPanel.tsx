import React from 'react';
import { CustomNetwork } from '../utils/CustomNetwork';

interface DebugPanelProps {
  network: CustomNetwork | null;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ network }) => {
  if (!network) {
    return <div>No network data available</div>;
  }

  const networkData = network.toJSON();

  return (
    <div>
      <h3>Debug Panel</h3>
      <pre>{JSON.stringify(networkData, null, 2)}</pre>
    </div>
  );
};

export default DebugPanel;