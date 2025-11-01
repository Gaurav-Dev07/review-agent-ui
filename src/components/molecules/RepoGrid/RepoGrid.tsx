import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { RepoCard, Repository } from '../../atoms/RepoCard/RepoCard';

interface RepoGridProps {
  repositories: Repository[];
  selectedRepo: Repository | null;
  onRepoSelect: (repository: Repository) => void;
  loading?: boolean;
}

export const RepoGrid: React.FC<RepoGridProps> = ({
  repositories,
  selectedRepo,
  onRepoSelect,
  loading = false,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={48} sx={{ color: '#6366f1' }} />
      </Box>
    );
  }

  if (repositories.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
          No repositories found
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Make sure your GitHub account has accessible repositories.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: { xs: 2, md: 3 },
      }}
    >
      {repositories.map((repository) => (
        <RepoCard
          key={repository.id}
          repository={repository}
          selected={selectedRepo?.id === repository.id}
          onClick={onRepoSelect}
          integrated={repository.isIntegrated}
        />
      ))}
    </Box>
  );
};