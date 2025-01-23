import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const D3Component: React.FC = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%');
      
    }
  }, []);

  return (
    <div ref={d3Container} style={{ width: '100%', height: '100%' }} />
  );
};

export default D3Component;