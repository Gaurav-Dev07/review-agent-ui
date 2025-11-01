import React from 'react';
import { AppBar, Toolbar, Box, Avatar, Typography, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Logo } from '../../atoms/Logo/Logo';

interface HeaderProps {
  user?: {
    name: string;
    avatar_url: string;
  } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(15, 15, 35, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 2, md: 3 } }}>
        <Logo size="medium" />
        
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
              <Avatar
                src={user.avatar_url}
                alt={user.name}
                sx={{ width: { xs: 28, md: 32 }, height: { xs: 28, md: 32 } }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.primary', 
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { sm: '0.875rem', md: '1rem' }
                }}
              >
                {user.name}
              </Typography>
            </Box>
            <IconButton
              onClick={onLogout}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Logout fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};