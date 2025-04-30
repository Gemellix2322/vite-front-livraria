import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    AuthContainer,
    FormColumn, 
    StyledTextField, 
    StyledButton, 
    StyledLink, 
    GhostColumn
  } from '../../css/AuthStyle';
import "../../css/App.css";
import Logo from "../../img/Login-Logo.png"
import notify from "../../components/NewAlert";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../components/Api.jsx";
import { Box, TextField, Button, Typography, Container, styled } from '@mui/material';

const Cadastro = ({ users }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await api.post("/post-users", {
          username: username,
          password: password,
        });
  
        if (response.status === 200) {
          notify('Cadastrado com sucesso', 'success');
          setTimeout(() => navigate("/"), 100);
        } else {
          notify('Erro ao cadastrar usuário', 'error');
        }
      } catch (error) {
        console.error("Erro completo:", error);
        notify('Erro ao cadastrar usuário', 'error');
      }
    };
  
    return (
      <AuthContainer>
        <GhostColumn/>
        <FormColumn>
          <Box sx={{ 
            width: '100%', 
            maxWidth: '400px', 
            padding: '20px',
            display: 'flex',
            flexDirection: 'column' }}>
            <Typography variant="h3" color="white" sx={{ mb: 8, fontWeight: 'bold' }}>
              Livros de Prateleira
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h4" color="white" sx={{ mb: 3 }}>
                Cadastro
              </Typography>
              <StyledTextField
                fullWidth
                label="Usuário"
                autoFocus
                value={username}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <StyledTextField
                fullWidth
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <StyledButton fullWidth type="submit" variant="contained">
                Cadastrar
              </StyledButton>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <StyledLink to="/">Já tenho Login</StyledLink>
              </Box>
            </Box>
          </Box>
        </FormColumn>
      </AuthContainer>
    );
  };

export default Cadastro;