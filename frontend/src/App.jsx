import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Jugadores from './components/Jugadores';
import Torneos from './components/Torneos';
import Inscripciones from './components/Inscripciones';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario'));

  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jugadores" element={<Jugadores token={token} usuario={usuario} />} />
        <Route
          path="/torneos"
          element={token ? <Torneos token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/inscripciones"
          element={token ? <Inscripciones token={token} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} setUsuario={setUsuario} />} />
        <Route path="/register" element={<Register setToken={setToken} setUsuario={setUsuario} />} />
      </Routes>
    </div>
  );
};

export default App;
