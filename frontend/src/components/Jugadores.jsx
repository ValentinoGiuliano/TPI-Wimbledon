import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function Jugadores({ token }) {
  const [jugadores, setJugadores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [ranking, setRanking] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJugadores();
  }, [currentPage, searchTerm]);

  const fetchJugadores = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/jugadores?search=${searchTerm}&page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJugadores(response.data.data);
      setTotalPages(response.data.pages);
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
        await axios.put(`http://localhost:3000/api/jugadores/${editId}`, jugador, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:3000/api/jugadores', jugador, {
          headers: { Authorization: `Bearer ${token}` }
        });
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
      await axios.delete(`http://localhost:3000/api/jugadores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchJugadores(); // Actualizar lista de jugadores
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Jugadores</h2>
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
          {jugadores.map((jugador) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Jugadores;
