import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div id="carouselExampleIndicators" className="carousel slide position-relative" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" style={{ maxHeight: '500px' }}>
          <div className="carousel-item active">
            <img src="/image1.webp" className="d-block w-100" alt="Federer 1" style={{ height: '500px', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div className="carousel-item">
            <img src="/image2.jpg" className="d-block w-100" alt="Nadal" style={{ height: '500px', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div className="carousel-item">
            <img src="/image3.jpg" className="d-block w-100" alt="Jugadora Femenina" style={{ height: '500px', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        <div className="carousel-caption d-none d-md-block" style={{ bottom: '150px' }}>
          <h1 style={{ color: 'rgba(255, 255, 255, 0.7)' }}>BIENVENIDO A WIMBLEDON</h1>
          <NavLink to="/jugadores" className="btn btn-primary mt-3">Ver Jugadores</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
