import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jugadores from './pages/Jugadores';
import Torneos from './pages/Torneos';
import Inscripciones from './pages/Inscripciones';
import Login from './pages/Login';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route
          path="/torneos"
          element={token ? <Torneos token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/inscripciones"
          element={token ? <Inscripciones token={token} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
