import {useNavigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Menu/Login.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import Cadastro from "./pages/Menu/Cadastro.jsx";
import Profile from "./pages/Menu/Profile.jsx";
import React, {useEffect, useState} from 'react';
import apicsharp from "./components/Api.jsx";
import { ToastContainer } from "react-toastify";
import LivroDetails from "./pages/Livro/LivroDetails.jsx";
import notify from "./components/NewAlert.js";
import 'react-toastify/dist/ReactToastify.css';
import Genre from "./pages/Genre.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [livro, setLivros] = useState([]);
  const [error, setError] = useState(null);
  const [authenticated, setAutheticated] = useState(true);

  useEffect(() => {
    if(authenticated){
      setAutheticated(true);
    }
    try{
      apicsharp.get('/api/Usuario')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
    } catch (error)
    {
      console.error('Erro completo:', error);
    }

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

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login users={users} setAuthenticated={setAutheticated} authenticated={authenticated}/>} />
        <Route path="/cadastro" element={<Cadastro users={users} />} />
        <Route path="/menu" element={<Menu users={users} authenticated={authenticated}/>} />
        <Route path="/profile" element={<Profile users={users} authenticated={authenticated}/>} />
        <Route path={`/livrodetails/:name`} element={<LivroDetails users={users} livros={livro} authenticated={authenticated}/>} />
        <Route path={`/genre/:genre`} element={<Genre genre={livro.genre} livro={livro} authenticated={authenticated}/>}/>
      </Routes>
    </div>
  );
}

export default App;

