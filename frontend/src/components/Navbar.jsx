import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src="/wimbledon-logo.png" alt="Wimbledon Logo" width="30" height="30" className="d-inline-block align-top" />
          Wimbledon
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jugadores">Jugadores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/torneos">Torneos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inscripciones">Inscripciones</NavLink>
            </li>
            <li className="nav-item">
              {token ? (
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              ) : (
                <NavLink className="nav-link" to="/login">Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
