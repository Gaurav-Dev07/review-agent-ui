import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface GradientButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined';
  children: React.ReactNode;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  variant = 'primary',
  children,
  sx,
  ...props
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          color: 'white',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 50%, #db2777 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.5)',
          },
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
          },
        };
      case 'outlined':
        return {
          background: 'transparent',
          color: '#6366f1',
          border: '2px solid #6366f1',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.1)',
            borderColor: '#5855eb',
            transform: 'translateY(-2px)',
          },
        };
      default:
        return {};
    }
  };

  return (
    <Button
      sx={{
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 600,
        padding: '12px 24px',
        fontSize: '1rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...getButtonStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};