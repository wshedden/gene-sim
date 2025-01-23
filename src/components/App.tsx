import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../styles/App.css'; // Import the CSS file
import D3Component from './D3Component';
import NeuralNetworkComponent from './NeuralNetworkComponent';
import DebugPanel from './DebugPanel';
import { createCustomNeuralNetwork } from '../utils/CustomNetwork';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const PLAY_AREA_WIDTH = 1200;
const PLAY_AREA_HEIGHT = 600;

const App: React.FC = () => {
  const [network, setNetwork] = useState<any>(null);

  useEffect(() => {
    const net = createCustomNeuralNetwork();
    setNetwork(net);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gene Simulation</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4} display="flex" justifyContent="space-between" alignItems="flex-start" height="100vh" padding={2}>
          <Paper elevation={3} className="neural-network" style={{ width: '300px', padding: '16px' }}>
            <NeuralNetworkComponent network={network} />
          </Paper>
          <ResizableBox width={PLAY_AREA_WIDTH} height={PLAY_AREA_HEIGHT} minConstraints={[300, 200]} maxConstraints={[PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT]}>
            <Paper elevation={3} className="play-area" style={{ height: '100%', position: 'relative' }}>
              <D3Component width={PLAY_AREA_WIDTH} height={PLAY_AREA_HEIGHT} />
            </Paper>
          </ResizableBox>
          <Paper elevation={3} className="debug-panel" style={{ width: '300px', padding: '16px' }}>
            <DebugPanel network={network} />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;