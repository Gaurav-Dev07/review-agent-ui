import React from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import { Toast } from '../../../hooks/useToast';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: '400px',
        width: '100%',
      }}
    >
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open={true}
          onClose={() => onRemove(toast.id)}
          sx={{ position: 'relative', transform: 'none !important' }}
        >
          <Alert
            onClose={() => onRemove(toast.id)}
            severity={toast.severity}
            sx={{
              width: '100%',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '& .MuiAlert-icon': {
                alignItems: 'center',
              },
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};