import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { GradientButton } from '../components/atoms/GradientButton/GradientButton';
import { Home } from '@mui/icons-material';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: '500px', mx: 'auto' }}>
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </Typography>
        <GradientButton
          variant="primary"
          size="large"
          startIcon={<Home />}
          onClick={() => window.location.href = '/'}
        >
          Return to Home
        </GradientButton>
      </Container>
    </Box>
  );
};

export default NotFound;