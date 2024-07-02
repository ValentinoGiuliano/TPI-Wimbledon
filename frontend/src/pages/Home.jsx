function Home() {
    return (
      <div className="container mt-5">
        <div className="jumbotron bg-light p-5 rounded">
          <h1 className="display-4">Wimbledon 2024</h1>
          <p className="lead">Este ejemplo está desarrollado con las siguientes tecnologías:</p>
          <hr className="my-4" />
          <p>Backend: NodeJs, Express, WebApiRest, Sequelize, Sqlite y múltiples capas en Javascript.</p>
          <p>Frontend: Single Page Application, HTML, CSS, Bootstrap, Javascript, NodeJs y React.</p>
          <a className="btn btn-primary btn-lg" href="/jugadores" role="button">Ver Jugadores</a>
        </div>
      </div>
    );
  }
  
  export default Home;
  