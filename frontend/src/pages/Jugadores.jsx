import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [ranking, setRanking] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJugadores();
  }, []);

  const fetchJugadores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/jugadores');
      setJugadores(response.data);
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const jugador = {
      Nombre: nombre,
      Nacionalidad: nacionalidad,
      Ranking: parseInt(ranking),
      FechaNacimiento: fechaNacimiento,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/jugadores/${editId}`, jugador);
      } else {
        await axios.post('http://localhost:3000/api/jugadores', jugador);
      }
      setNombre('');
      setNacionalidad('');
      setRanking('');
      setFechaNacimiento('');
      setEditId(null);
      fetchJugadores(); // Actualizar lista de jugadores
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  const handleEdit = (jugador) => {
    setEditId(jugador.IdJugador);
    setNombre(jugador.Nombre);
    setNacionalidad(jugador.Nacionalidad);
    setRanking(jugador.Ranking);
    setFechaNacimiento(jugador.FechaNacimiento);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/jugadores/${id}`);
      fetchJugadores(); // Actualizar lista de jugadores
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  const filteredJugadores = jugadores.filter(jugador =>
    jugador.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Jugadores</h2>
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
          <label className="form-label">Nacionalidad</label>
          <input
            type="text"
            className="form-control"
            value={nacionalidad}
            onChange={(e) => setNacionalidad(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ranking</label>
          <input
            type="number"
            className="form-control"
            value={ranking}
            onChange={(e) => setRanking(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
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
            <th>Nacionalidad</th>
            <th>Ranking</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredJugadores.map(jugador => (
            <tr key={jugador.IdJugador}>
              <td>{jugador.Nombre}</td>
              <td>{jugador.Nacionalidad}</td>
              <td>{jugador.Ranking}</td>
              <td>{jugador.FechaNacimiento}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(jugador)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(jugador.IdJugador)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Jugadores;
