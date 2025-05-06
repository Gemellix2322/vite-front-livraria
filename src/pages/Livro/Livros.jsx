import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Grid,
  Chip
} from '@mui/material';

const Livros = ({ livro }) => {
  const navigate = useNavigate();
  // Agrupe os livros por gênero
  const livrosPorGenero = livro.reduce((acc, l) => {
    const genero = l.genre || 'Sem Gênero';
    if (!acc[genero]) {
      acc[genero] = [];
    }
    acc[genero].push(l);
    return acc;
  }, {});

  return (
    <Box>
      {Object.entries(livrosPorGenero).map(([genero, livros]) => (
        <Box key={genero} sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#ffffff',
              fontWeight: 500,
              pl: 3,
              position: 'relative',
              mb: 3,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: '24px',
                width: '48px',
                height: '2px',
                backgroundColor: '#4299e1',
              }
            }}
          >
            {genero}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: '2rem', 
            px: 2,
            py: 1,
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#2d3748',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#4a5568',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#718096',
              },
            },
          }}>
            {livros.map((l) => (
              <Card 
                key={l.id} 
                component={Link}
                to={`/livrodetails/${l.name}`}
                sx={{
                  position: 'relative',
                  width: 200,
                  height: 300,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  bgcolor: 'transparent',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-10px)',
                    '& .MuiCardContent-root': {
                      transform: 'translateY(0)',
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={l.cover_image}
                  alt={l.name}
                  sx={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
                <CardContent
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.7))',
                    color: '#ffffff',
                    p: 2,
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(100%)',
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {l.name}
                  </Typography>
                  <Chip
                    label={l.genre} 
                    size="small"
                    onClick={(e) => {
                      e.preventDefault(); // evita navegação do Card
                      navigate(`/genre/${l.genre}`);
                    }}
                    sx={{
                      border: '1px solid white',
                      borderRadius: '10px',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Livros;