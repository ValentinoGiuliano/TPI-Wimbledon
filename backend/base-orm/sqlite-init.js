const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  try {
    await db.open("./.data/wimbledon.db");
    console.log("Base de datos abierta");

    // Crear tabla usuarios
    let res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'usuarios'");
    if (res.contar === 0) {
      await db.run("CREATE table usuarios(IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL)");
      console.log("Tabla usuarios creada!");
      await db.run("INSERT INTO usuarios (Nombre, Clave, Rol) VALUES ('admin', '123', 'admin'), ('juan', '123', 'member')");
      console.log("Usuarios insertados!");
    } else {
      console.log("Tabla usuarios ya existe");
    }

    // Crear tabla jugadores
    res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'jugadores'");
    if (res.contar === 0) {
      await db.run("CREATE table jugadores(IdJugador INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, Nacionalidad text, Ranking integer, FechaNacimiento text)");
      console.log("Tabla jugadores creada!");
      await db.run("INSERT INTO jugadores (Nombre, Nacionalidad, Ranking, FechaNacimiento) VALUES ('Roger Federer', 'Suiza', 3, '1981-08-08'), ('Rafael Nadal', 'España', 2, '1986-06-03')");
      console.log("Jugadores insertados!");
    } else {
      console.log("Tabla jugadores ya existe");
    }

    // Crear tabla torneos
    res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'torneos'");
    if (res.contar === 0) {
      await db.run("CREATE table torneos(IdTorneo INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, FechaInicio text, FechaFin text)");
      console.log("Tabla torneos creada!");
      await db.run("INSERT INTO torneos (Nombre, FechaInicio, FechaFin) VALUES ('Wimbledon 2024', '2024-06-28', '2024-07-11')");
      console.log("Torneos insertados!");
    } else {
      console.log("Tabla torneos ya existe");
    }

    // Crear tabla inscripciones
    res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'inscripciones'");
    if (res.contar === 0) {
      await db.run("CREATE table inscripciones(IdInscripcion INTEGER PRIMARY KEY AUTOINCREMENT, IdJugador INTEGER, IdTorneo INTEGER, FOREIGN KEY(IdJugador) REFERENCES jugadores(IdJugador), FOREIGN KEY(IdTorneo) REFERENCES torneos(IdTorneo))");
      console.log("Tabla inscripciones creada!");
    } else {
      console.log("Tabla inscripciones ya existe");
    }

    await db.close();
    console.log("Base de datos cerrada");
  } catch (err) {
    console.error("Error creando la base de datos: ", err);
  }
}

CrearBaseSiNoExiste();
module.exports = CrearBaseSiNoExiste;
