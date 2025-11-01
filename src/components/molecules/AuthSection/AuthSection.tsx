import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { GradientButton } from '../../atoms/GradientButton/GradientButton';

interface AuthSectionProps {
  onGitHubAuth: () => void;
  loading?: boolean;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ onGitHubAuth, loading = false }) => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
          borderRadius: { xs: '16px', md: '24px' },
          padding: { xs: '24px 16px', md: '48px 32px' },
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Box
          sx={{
            width: { xs: 60, md: 80 },
            height: { xs: 60, md: 80 },
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
            borderRadius: { xs: '16px', md: '20px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: { xs: '0 auto 16px', md: '0 auto 24px' },
          }}
        >
          <GitHub sx={{ fontSize: { xs: 32, md: 40 }, color: 'white' }} />
        </Box>

        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            mb: 2, 
            fontWeight: 600,
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          Connect Your GitHub
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary', 
            mb: { xs: 3, md: 4 }, 
            maxWidth: '500px', 
            mx: 'auto',
            fontSize: { xs: '0.875rem', md: '1.125rem' },
            px: { xs: 1, md: 0 }
          }}
        >
          Securely connect your GitHub account to access your repositories and enable AI-powered code reviews.
          Your data is protected and never stored permanently.
        </Typography>

        <GradientButton
          variant="primary"
          size="large"
          onClick={onGitHubAuth}
          disabled={loading}
          startIcon={<GitHub />}
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            padding: { xs: '12px 24px', md: '16px 32px' },
            minWidth: { xs: '180px', md: '200px' },
          }}
        >
          {loading ? 'Connecting...' : 'Continue with GitHub'}
        </GradientButton>
      </Box>
    </Container>
  );
};