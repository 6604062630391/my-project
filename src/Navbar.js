import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from './logo1.png';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#000000', color: 'white' }}>
        <Toolbar sx={{ minHeight: 80 }}>
          <img
            alt=""
            src={logo}
            width="70"
            height="70"
            className="d-inline-block align-top"
            
          />
          <Typography variant="h6" component="div" 
            sx={{ flexGrow: 1, fontFamily: 'Bakbak One', fontWeight: 'normal', fontSize: '24px', marginLeft: 1 }}
          >
            Numerical
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
