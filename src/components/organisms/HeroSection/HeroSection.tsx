import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { AutoAwesome, Speed, Security } from '@mui/icons-material';

export const HeroSection: React.FC = () => {
  const features = [
    {
      icon: <AutoAwesome sx={{ fontSize: 24, color: '#6366f1' }} />,
      title: 'AI-Powered Reviews',
      description: 'Advanced AI analyzes your code for bugs, security issues, and improvements.',
    },
    {
      icon: <Speed sx={{ fontSize: 24, color: '#8b5cf6' }} />,
      title: 'Instant Analysis',
      description: 'Get comprehensive code reviews in seconds, not hours.',
    },
    {
      icon: <Security sx={{ fontSize: 24, color: '#ec4899' }} />,
      title: 'Security First',
      description: 'Identify vulnerabilities and security best practices automatically.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 3,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.5rem' },
            lineHeight: { xs: 1.2, md: 1.2 },
            px: { xs: 2, md: 0 },
          }}
        >
          Code Review Assistant
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
            fontWeight: 400,
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.25rem' },
            px: { xs: 2, md: 0 },
          }}
        >
          Enhance your development workflow with AI-powered code reviews.
          Connect your GitHub repositories and get intelligent feedback on your code instantly.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 4 },
          mt: { xs: 4, md: 8 },
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              p: { xs: 2, md: 3 },
              borderRadius: { xs: '12px', md: '16px' },
              background: 'rgba(26, 26, 46, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: { xs: 'translateY(-2px)', md: 'translateY(-4px)' },
                background: 'rgba(26, 26, 46, 0.8)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
                borderRadius: { xs: '12px', md: '16px' },
                background: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: { xs: '0 auto 12px', md: '0 auto 16px' },
              }}
            >
              {feature.icon}
            </Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {feature.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};