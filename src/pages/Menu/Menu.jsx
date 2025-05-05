import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apicsharp } from "../../components/Api.jsx";
import notify from "../../components/NewAlert.js";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar.jsx";
import LivrodoDia from "../Livro/LivrodoDia.jsx";
import Livros from "../Livro/Livros.jsx";
import Logo from "../../img/Login-Logo.png";
import React from "react";
import AddLivro from "../Livro/AddLivro.jsx";

// Material UI imports
import { 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  Container, 
  IconButton, 
  Avatar, 
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';

const Menu = ({ users, authenticated }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('currentUserId');
    const currentUser = users.find(user => user.id === parseInt(userId));

    const [formData, setFormData] = useState({
        name: currentUser.name,
        user: currentUser.username,
        password: currentUser.password,
        profile_picture: currentUser.profile_picture,
        admin: currentUser.admin,
    });
    
    const [livro, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isAddLivroOpen, setIsAddLivroOpen] = useState(false);

    useEffect(() => {
        if(authenticated === false){
            notify('Loge primeiro', 'warning')
            navigate('/')
        } else {
            notify('Logado com sucesso', 'success', 900);
        }
        
        //Nova api em C#
        apicsharp.get('/api/Livros')
            .then(response => {
                setLivros(response.data);
                setLoading(false);
            })
            .catch(error => {
                notify('Erro ao buscar livros:', 'error');
                setError(error);
                setLoading(false);
            });

    }, []);

    if (loading) return <Typography sx={{ color: '#fff', p: 3 }}>Carregando...</Typography>;
    if (error) return <Typography sx={{ color: '#fff', p: 3 }}>Erro ao carregar livros: {error.message}</Typography>;

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#1a1a1a',
            color: '#ffffff'
        }}>
                <AppBar 
                    position="static" 
                    sx={{
                        background: 'linear-gradient(89deg, #142046 13%, #1a295b 86%)',
                        minHeight: 200,
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Toolbar sx={{ 
                        justifyContent: 'space-between',
                        p: '0 2rem',
                        position: 'relative',
                        height: 200
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
                                height: 'auto',
                                ml: 'auto',
                                mr: '15px'
                            }}
                        />
                        
                        <Typography variant="h4" sx={{ 
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}>
                            {formData?.name ? `Bem-vindo ${formData.name}` : 'Bem-vindo'}
                        </Typography>
                        
                        {currentUser.admin === 1 && (
                            <Button
                                onClick={() => setIsAddLivroOpen(true)}
                                variant="contained"
                                sx={{ bgcolor: '#4299e1', '&:hover': { bgcolor: '#3182ce' } }}
                            >
                                Add Livro
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            <Container sx={{ p: '2rem 0' }}>
                <Typography variant="h4" sx={{ 
                    color: '#ffffff', 
                    mb: 4, 
                    fontWeight: 600,
                    pl: 2
                }}>
                    Livros Disponíveis
                </Typography>
                
                <Box>
                    <LivrodoDia livro={livro}/>
                </Box>
                
                <Box>
                    <Livros livro={livro}/>
                </Box>
            </Container>
            <Dialog open={isAddLivroOpen} onClose={() => setIsAddLivroOpen(false)} maxWidth="sm" fullWidth>
                <DialogContent>
                    <AddLivro 
                        users={users} 
                        authenticated={authenticated} 
                        onClose={() => setIsAddLivroOpen(false)} 
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Menu;