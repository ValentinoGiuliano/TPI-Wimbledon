import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Torneos({ token }) {
  const [torneos, setTorneos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTorneos();
  }, [token]);

  const fetchTorneos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/torneos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTorneos(response.data);
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const torneo = {
      Nombre: nombre,
      FechaInicio: fechaInicio,
      FechaFin: fechaFin,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/torneos/${editId}`, torneo, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:3000/api/torneos', torneo, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setNombre('');
      setFechaInicio('');
      setFechaFin('');
      setEditId(null);
      fetchTorneos(); // Actualizar lista de torneos
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  const handleEdit = (torneo) => {
    setEditId(torneo.IdTorneo);
    setNombre(torneo.Nombre);
    setFechaInicio(torneo.FechaInicio);
    setFechaFin(torneo.FechaFin);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/torneos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTorneos(); // Actualizar lista de torneos
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  const filteredTorneos = torneos.filter(torneo =>
    torneo.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Torneos</h2>
      <form onSubmit={handleAddOrUpdate}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Inicio</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Fin</label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      <input
        type="text"
        className="form-control my-3 w-50"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTorneos.map(torneo => (
            <tr key={torneo.IdTorneo}>
              <td>{torneo.Nombre}</td>
              <td>{torneo.FechaInicio}</td>
              <td>{torneo.FechaFin}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(torneo)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(torneo.IdTorneo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Torneos;
