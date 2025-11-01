import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AuthCallback from './pages/AuthCallback';
import Repositories from './pages/Repositories/Repositories';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="auth/callback" element={<AuthCallback />} />
          <Route path="repos/" element={<Repositories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;