import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Box, CssBaseline, ThemeProvider, createTheme, TextField, Button } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import D3Component from './D3Component';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  const [screen, setScreen] = useState<'intro' | 'simulation'>('simulation'); // Set initial state to 'simulation'
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gene Simulation</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ResizableBox width={600} height={400} minConstraints={[300, 200]} maxConstraints={[800, 600]}>
                <Paper elevation={3} style={{ padding: '16px', height: '100%', position: 'relative' }}>
                  <Box
                    sx={{
                      border: '2px solid #fff',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <D3Component />
                  </Box>
                </Paper>
              </ResizableBox>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;