import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  Chip,
  Grid,
  Paper
} from '@mui/material';

const LivrodoDia = ({ livro }) => {
  // Se não houver livros, retorne null
  if (!livro || livro.length === 0) return null;

  // Selecione aleatoriamente um livro para ser o livro do dia
  // Ou você pode implementar uma lógica específica de seleção
  const livrodoDia = livro[Math.floor(Math.random() * livro.length)];

  return (
    <Box sx={{ mb: 4, px: 2 }}>
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
        Livro do Dia
      </Typography>
      
      <Paper 
        elevation={6}
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #101d42 0%, #1e3a8a 100%)',
          mb: 4
        }}
      >
        <Grid container>
          <Grid item xs={12} md={4} sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Card
              component={Link}
              to={`/livrodetails/${livrodoDia.name}`}
              sx={{
                width: 250,
                height: 375,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                }
              }}
            >
              <CardMedia
                component="img"
                image={livrodoDia.cover_image}
                alt={livrodoDia.name}
                sx={{ 
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8} sx={{ p: 4, color: 'white' }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              {livrodoDia.name}
            </Typography>
            
            <Chip 
              label={livrodoDia.genre} 
              sx={{
                mb: 3,
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              {livrodoDia.description}
            </Typography>
            
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
              Disponível para leitura agora
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LivrodoDia;