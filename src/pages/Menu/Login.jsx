import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import notify from "../../components/NewAlert";
import { 
  AuthContainer, 
  FormColumn, 
  StyledTextField, 
  StyledButton, 
  StyledLink, 
  GhostColumn
} from '../../css/AuthStyle';

const Login = ({ users, setAuthenticated, authenticated }) => {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const checkUserCredentials = (inputUser, inputPassword) => {
    return users.some(u => u.username === inputUser && u.password === inputPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuthenticated(true);

    if (!username.trim() || !password.trim()) {
      notify('Por favor, preencha todos os campos', 'warning');
      return;
    }

    if (!Array.isArray(users)) {
      notify('Erro ao verificar credenciais. Tente novamente.', 'error');
      return;
    }

    if (checkUserCredentials(username, password)) {
      const currentUser = users.find(u => u.username === username);
      localStorage.setItem('currentUserId', currentUser.id);
      navigate("/menu");
    } else {
      notify('Credenciais inválidas', 'error');
    }
  };

  useEffect(() => {
    const resetAuthenticated = () => {
      if (authenticated) {
        notify("Deslogado com sucesso", 'success');
        setAuthenticated(false);
      }
    };
    window.addEventListener('focus', resetAuthenticated);
    return () => window.removeEventListener('focus', resetAuthenticated);
  }, [authenticated, setAuthenticated]);

  return (
    <AuthContainer>
      <GhostColumn/>
      <FormColumn>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" color="white" sx={{ mb: 8, fontWeight: 'bold' }}>
            Livros de Prateleira
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" color="white" sx={{ mb: 3 }}>
              Login
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
              Entrar
            </StyledButton>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <StyledLink to="/cadastro">Não tenho Login</StyledLink>
            </Box>
          </Box>
        </Box>
      </FormColumn>
    </AuthContainer>
  );
};

export default Login;