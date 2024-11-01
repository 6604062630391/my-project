import React from 'react';
import Box from '@mui/material/Box';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: 'white',
        padding: '10px 0',
        textAlign: 'center',
        marginTop: '200px', 
      }}
    >
      <Container maxWidth="lg">
        <h4 style={{ margin: 0, fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
          © 2024 Fadia H. All rights reserved
        </h4>
      </Container>
    </Box>
  );
}
