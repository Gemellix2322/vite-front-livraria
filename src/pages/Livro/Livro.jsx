import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip
} from '@mui/material';

const Livro = ({ livro }) => {
  // Verificação de segurança
  if (!livro) {
    return <Typography sx={{ color: '#fff' }}>Carregando...</Typography>;
  }

  return (
    <Card
      sx={{
        position: 'relative',
        width: 200,
        height: 300,
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        bgcolor: 'transparent',
        '&:hover': {
          transform: 'scale(1.05) translateY(-10px)',
          '& .livro-details': {
            transform: 'translateY(0)',
          }
        }
      }}
    >
      <CardMedia
        component="div"
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: livro.cover_image ? `url(${livro.cover_image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
        }}
      />
      <CardContent
        className="livro-details"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.7))',
          color: '#ffffff',
          p: 1.5,
          borderRadius: '0 0 8px 8px',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(100%)',
          zIndex: 1,
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {livro.name || 'Sem título'}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1 }}>
          {livro.description?.length > 25 ? livro.description.slice(0, 45) + '...' : livro.description}
        </Typography>
        
        <Chip
          component={Link}
          to={`/genre/${livro.genre}`}
          label={livro.genre || 'Sem Gênero'}
          size="small"
          clickable
          sx={{
            border: '1px solid white',
            borderRadius: '10px',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            textDecoration: 'none',
            '& .MuiChip-label': {
              p: 0,
              m: 0
            }
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Livro;