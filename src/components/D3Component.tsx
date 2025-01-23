import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const PLAY_AREA_WIDTH = 1200;
const PLAY_AREA_HEIGHT = 800;

interface D3ComponentProps {
  width: number;
  height: number;
}

const D3Component: React.FC<D3ComponentProps> = ({ width, height }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      
      // Add your D3 code here
    }
  }, [width, height]);

  return (
    <div ref={d3Container} style={{ width: '100%', height: '100%' }} />
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
      </AppBar>
    </ThemeProvider>
  );
};

export default App;
export { D3Component };