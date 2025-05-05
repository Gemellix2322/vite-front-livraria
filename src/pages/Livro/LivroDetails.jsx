import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Typography, AppBar, Toolbar, Container, Grid, IconButton, Avatar, Button } from '@mui/material';
import Logo from '../../img/Login-Logo.png';
import { useState, useEffect } from 'react';
import api from '../../components/Api.jsx';
import notify from '../../components/NewAlert';
import Navbar from '../Menu/Navbar';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';

const labels = {
    0.5: '0.5',
    1: '1',
    1.5: '1.5',
    2: '2',
    2.5: '2.5',
    3: '3',
    3.5: '3.5',
    4: '4',
    4.5: '4.5',
    5: '5',
  };

function LivroDetails({ users, livros, authenticated }) {
    const navigate = useNavigate();
    const { name } = useParams();
    const userId = localStorage.getItem('currentUserId');
    const currentUser = users.find(user => user.id === parseInt(userId));
    const [formData, setFormData] = useState({
        name: currentUser.username,
        user: currentUser.name,
        password: currentUser.password,
        profile_picture: currentUser.profile_picture,
    });
    const [user, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [value, setValue] = useState(labels);
    const [onoff, setOnoff] = useState(false);

    // useEffect permanece igual
    useEffect(() => {
        if(!authenticated){
            notify('Loge primeiro', 'warning')
            navigate('/')
        }
        const fetchData = async () => {
            try {
                const [messagesResponse, usersResponse] = await Promise.all([
                    api.get('/messages'),
                    api.get('/get-users')
                ]);
                setMessages(messagesResponse.data);
                setUsers(usersResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setError('Erro ao carregar dados.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const livro = livros.find(l => l.name === name);
    if (!livro) return <Typography>Livro não encontrado</Typography>;

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
                    justifyContent: 'space-between',
                    p: '0 2rem'
                }}>
                    <IconButton onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                        <Avatar 
                            src={formData.profile_picture}
                            sx={{
                                width: 70,
                                height: 70,
                                border: '2px solid #ddd'
                            }}
                        />
                    </IconButton>
                    {isNavbarOpen && <Navbar isNavbarOpen={isNavbarOpen} user={users} setIsNavbarOpen={setIsNavbarOpen}/>}
                    <Box component="img" 
                        src={Logo} 
                        alt="Logo"
                        sx={{
                            width: 50,
                            ml: 'auto',
                            mr: '15px'
                        }}
                    />
                </Toolbar>
            </AppBar>

            <Container>
                <IconButton 
                    component={Link} 
                    to="/menu"
                    sx={{
                        position: 'absolute',
                        top: '25%',
                        left: '3%',
                        color: 'white'
                    }}
                >
                    <ArrowBack sx={{ width: 40, height: 'auto' }}/>
                </IconButton>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box component="img"
                            src={livro.cover_image}
                            sx={{
                                mt: '150px',
                                width: 325,
                                height: 500,
                                borderRadius: '20px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{
                        mt: '150px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography variant="h1" sx={{ fontSize: 30 }}>
                            {livro.name}
                        </Typography>
                        <Typography sx={{ fontSize: 20, maxWidth: 500 }}>
                            {livro.description}
                        </Typography>
                        <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                        <Typography>Rating</Typography>
                        <Rating
                            name="text-feedback"
                            value={value}
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Box sx={{ ml: 2 }}>{labels[value] || ''}</Box>
                        </Box>
                        <Box>
                            <Button
                                sx={{ color: onoff ? 'green' : 'red' }}
                                value={onoff}
                                onClick={() => setOnoff(!onoff)}
                                >
                                {onoff ? 'Marcar como Disponível' : 'Marcar como Indisponível'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default LivroDetails;