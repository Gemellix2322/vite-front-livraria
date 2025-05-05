import { useNavigate, useParams } from "react-router-dom";
import Livro from "./Livro/Livro.jsx";
import { useEffect, useState } from "react";
import notify from "../components/NewAlert.js";
import React from "react";

// Material UI imports
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Grid,
  List,
  ListItem,
  Divider,
  Paper
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from "react-router-dom";

const Genre = ({ livro, authenticated }) => {
    const navigate = useNavigate();
    const { genre } = useParams();
    const [randomGenre, setRandomGenre] = useState(null);

    const genres = [...new Set(livro.map((l) => l.genre))];
    
    const getRandomGenre = () => {
        // Garantir que o gênero aleatório é diferente do gênero atual
        const filteredGenres = genres.filter(g => g !== genre);
        const randomIndex = Math.floor(Math.random() * filteredGenres.length);
        setRandomGenre(filteredGenres[randomIndex]);
    };

    useEffect(() => {
        if (!authenticated) {
            notify('Loge primeiro', 'warning');
            navigate('/');
        }
        getRandomGenre();
    }, [livro, authenticated, navigate, genre]);

    // Filtrar livros pelo gênero selecionado
    const genreBooks = livro.filter((l) => l.genre === genre);
    
    // Filtrar livros pelo gênero aleatório
    const randomGenreBooks = randomGenre ? livro.filter((l) => l.genre === randomGenre) : [];

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#1a1a1a',
            color: '#ffffff'
        }}>
            <AppBar position="static" sx={{
                background: 'linear-gradient(89deg, #142046 13%, #1a295b 86%)',
                height: 200,
            }}>
                <Toolbar sx={{ 
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: '0 2rem',
                    height: '100%'
                }}>
                    <IconButton 
                        component={Link} 
                        to="/menu"
                        sx={{
                            position: 'absolute',
                            left: '3%',
                            color: 'white'
                        }}
                    >
                        <ArrowBack sx={{ width: 30, height: 'auto' }}/>
                    </IconButton>
                    
                    <Typography variant="h4" sx={{ 
                        fontWeight: 600
                    }}>
                        Gêneros
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 4 }}>
                {/* Seção do gênero selecionado */}
                <Box sx={{ mb: 6 }}>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#ffffff',
                            fontWeight: 500,
                            pl: 2,
                            position: 'relative',
                            mb: 3,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: '-8px',
                                left: '16px',
                                width: '48px',
                                height: '2px',
                                backgroundColor: '#4299e1',
                            }
                        }}
                    >
                        {`Livros de ${genre}`}
                    </Typography>
                    
                    <Paper 
                        elevation={0}
                        sx={{
                            bgcolor: 'transparent',
                            overflow: 'auto',
                            borderRadius: 2,
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
                        }}
                    >
                        <List 
                            sx={{ 
                                display: 'flex',
                                flexWrap: 'nowrap',
                                overflow: 'auto',
                                gap: 3,
                                p: 2
                            }}
                        >
                            {genreBooks.length > 0 ? (
                                genreBooks.map((l) => (
                                    <ListItem 
                                        key={l.id} 
                                        sx={{ 
                                            width: 'auto', 
                                            p: 0,
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                        component={Link}
                                        to={`/livro/${l.name}`}
                                    >
                                        <Livro livro={l} />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography sx={{ color: '#aaa', p: 2 }}>
                                    Nenhum livro encontrado para este gênero.
                                </Typography>
                            )}
                        </List>
                    </Paper>
                </Box>

                {/* Divider com estilo */}
                <Divider sx={{ 
                    my: 4, 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    width: '90%',
                    mx: 'auto'
                }} />

                {/* Seção de outros gêneros */}
                <Box sx={{ mt: 4 }}>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#ffffff',
                            fontWeight: 500,
                            pl: 2,
                            position: 'relative',
                            mb: 3,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: '-8px',
                                left: '16px',
                                width: '48px',
                                height: '2px',
                                backgroundColor: '#4299e1',
                            }
                        }}
                    >
                        {randomGenre ? `Você também pode gostar: ${randomGenre}` : 'Outros Gêneros'}
                    </Typography>
                    
                    <Paper 
                        elevation={0}
                        sx={{
                            bgcolor: 'transparent',
                            overflow: 'auto',
                            borderRadius: 2,
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
                        }}
                    >
                        <List 
                            sx={{ 
                                display: 'flex',
                                flexWrap: 'nowrap',
                                overflow: 'auto',
                                gap: 3,
                                p: 2
                            }}
                        >
                            {randomGenreBooks.length > 0 ? (
                                randomGenreBooks.map((l) => (
                                    <ListItem 
                                        key={l.id} 
                                        sx={{ 
                                            width: 'auto', 
                                            p: 0,
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                        component={Link}
                                        to={`/livro/${l.name}`}
                                    >
                                        <Livro livro={l} />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography sx={{ color: '#aaa', p: 2 }}>
                                    Carregando sugestões...
                                </Typography>
                            )}
                        </List>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default Genre;