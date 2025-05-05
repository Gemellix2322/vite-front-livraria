import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import notify from "../../components/NewAlert";

const AddLivro = ({ users, authenticated }) => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("currentUserId");
    const currentUser = users.find(user => user.id === parseInt(userId));

    const [formData, setFormData] = useState({
        titulo: "",
        autor: "",
        genero: "",
        ano: "",
    });

    useEffect(() => {
        if (!authenticated) {
            notify("Logue primeiro", "warning");
            navigate("/");
        } else {
            notify("Logado com sucesso", "success", 900);
        }
    }, [authenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar o formData para a API
        console.log("Enviando livro:", formData);
        notify("Livro adicionado com sucesso!", "success");
        // Depois, se quiser, redireciona ou limpa campos
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    boxShadow: 6,
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #1e3a8a 100%)',
                    color: '#fff',
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                        Adicionar Novo Livro
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Título"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ccc' } }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderColor: '#555',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#444',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#888',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fff',
                                    },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Autor"
                            name="autor"
                            value={formData.autor}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ccc' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#444',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#888',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fff',
                                    },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Gênero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ccc' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#444',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#888',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fff',
                                    },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Ano"
                            name="ano"
                            type="number"
                            value={formData.ano}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ccc' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#444',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#888',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fff',
                                    },
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: '#2563eb',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#1d4ed8',
                                },
                            }}
                        >
                            Adicionar Livro
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>

    );
};

export default AddLivro;
