import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ setToken, setUsuario }) {
  const [usuario, setUsuarioInput] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/register', { usuario, clave });
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('usuario', usuario);
      setToken(accessToken);
      setUsuario(usuario);
      navigate('/'); // Redirigir al inicio o donde prefieras
    } catch (error) {
      console.error('Hubo un error!', error);
      alert('El nombre de usuario ya está en uso o ha ocurrido un error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuarioInput(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Clave</label>
          <input
            type="password"
            className="form-control"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
