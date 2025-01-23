import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import D3Component from './D3Component';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const PLAY_AREA_WIDTH = 1200;
const PLAY_AREA_HEIGHT = 600;

const App: React.FC = () => {
  const [screen, setScreen] = useState<'intro' | 'simulation'>('simulation'); // Set initial state to 'simulation'

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gene Simulation</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4} display="flex" justifyContent="flex-end" alignItems="flex-start" height="100vh" padding={2}>
          <ResizableBox width={PLAY_AREA_WIDTH} height={PLAY_AREA_HEIGHT} minConstraints={[300, 200]} maxConstraints={[PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT]}>
            <Paper elevation={3} style={{ padding: '16px', height: '100%', position: 'relative' }}>
            </Paper>
          </ResizableBox>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;