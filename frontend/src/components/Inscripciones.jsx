import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inscripciones({ token }) {
  const [inscripciones, setInscripciones] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [torneos, setTorneos] = useState([]);
  const [jugadorId, setJugadorId] = useState('');
  const [torneoId, setTorneoId] = useState('');
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inscripcionesRes, jugadoresRes, torneosRes] = await Promise.all([
          axios.get('http://localhost:3000/api/inscripciones', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:3000/api/jugadores?limit=1000', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:3000/api/torneos', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setInscripciones(inscripcionesRes.data);
        setJugadores(jugadoresRes.data.data); // Asegúrate de ajustar esto según tu estructura de datos
        setTorneos(torneosRes.data);
      } catch (error) {
        console.error('Hubo un error!', error);
      }
    };

    fetchData();
  }, [token]);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const inscripcion = {
      IdJugador: jugadorId,
      IdTorneo: torneoId,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/inscripciones/${editId}`, inscripcion, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:3000/api/inscripciones', inscripcion, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setJugadorId('');
      setTorneoId('');
      setEditId(null);
      setErrorMessage('');
      fetchInscripciones(); // Actualizar lista de inscripciones
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('La inscripción ya existe.');
      } else {
        setErrorMessage('Error al agregar la inscripción.');
        console.error('Hubo un error!', error.response ? error.response.data : error);
      }
    }
  };

  const handleEdit = (inscripcion) => {
    setEditId(inscripcion.IdInscripcion);
    setJugadorId(inscripcion.IdJugador);
    setTorneoId(inscripcion.IdTorneo);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/inscripciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInscripciones(); // Actualizar lista de inscripciones
    } catch (error) {
      console.error('Hubo un error!', error);
    }
  };

  const fetchInscripciones = async () => {
    const response = await axios.get('http://localhost:3000/api/inscripciones', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setInscripciones(response.data);
  };

  const getNombreJugador = (id) => {
    const jugador = jugadores.find((j) => j.IdJugador === id);
    return jugador ? jugador.Nombre : 'Cargando...';
  };

  const getNombreTorneo = (id) => {
    const torneo = torneos.find((t) => t.IdTorneo === id);
    return torneo ? torneo.Nombre : 'Cargando...';
  };

  return (
    <div className="container mt-5">
      <h2>Inscripciones</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleAddOrUpdate}>
        <div className="mb-3">
          <label className="form-label">Jugador</label>
          <select
            className="form-control"
            value={jugadorId}
            onChange={(e) => setJugadorId(e.target.value)}
          >
            <option value="">Seleccionar Jugador</option>
            {jugadores.map((jugador) => (
              <option key={jugador.IdJugador} value={jugador.IdJugador}>
                {jugador.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Torneo</label>
          <select
            className="form-control"
            value={torneoId}
            onChange={(e) => setTorneoId(e.target.value)}
          >
            <option value="">Seleccionar Torneo</option>
            {torneos.map((torneo) => (
              <option key={torneo.IdTorneo} value={torneo.IdTorneo}>
                {torneo.Nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Torneo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((inscripcion) => (
            <tr key={inscripcion.IdInscripcion}>
              <td>{getNombreJugador(inscripcion.IdJugador)}</td>
              <td>{getNombreTorneo(inscripcion.IdTorneo)}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(inscripcion)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(inscripcion.IdInscripcion)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inscripciones;
