// base-orm/sqlite-init.js
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  try {
    // abrir base, si no existe el archivo/base lo crea
    await db.open("./.data/wimbledon.db");

    let existe = false;
    let res = null;

    // Crear tabla usuarios
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'", []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run("CREATE table usuarios(IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);");
      console.log("tabla usuarios creada!");
      await db.run("INSERT INTO usuarios VALUES (1, 'admin', '123', 'admin'), (2, 'juan', '123', 'member');");
    }

    // Crear tabla jugadores
    existe = false;
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'jugadores'", []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run("CREATE table jugadores(IdJugador INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, Nacionalidad text, Ranking integer, FechaNacimiento text);");
      console.log("tabla jugadores creada!");
      await db.run("INSERT INTO jugadores VALUES (1, 'Roger Federer', 'Suiza', 3, '1981-08-08'), (2, 'Rafael Nadal', 'España', 2, '1986-06-03');");
    }

    // Crear tabla torneos
    existe = false;
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'torneos'", []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run("CREATE table torneos(IdTorneo INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, FechaInicio text, FechaFin text);");
      console.log("tabla torneos creada!");
      await db.run("INSERT INTO torneos VALUES (1, 'Wimbledon 2024', '2024-06-28', '2024-07-11');");
    }

    // Crear tabla inscripciones
    existe = false;
    res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'inscripciones'", []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run("CREATE table inscripciones(IdInscripcion INTEGER PRIMARY KEY AUTOINCREMENT, IdJugador INTEGER, IdTorneo INTEGER, FOREIGN KEY(IdJugador) REFERENCES jugadores(IdJugador), FOREIGN KEY(IdTorneo) REFERENCES torneos(IdTorneo));");
      console.log("tabla inscripciones creada!");
    }

    // cerrar la base
    await db.close();
  } catch (err) {
    console.error("Error creando la base de datos: ", err);
  }
}

CrearBaseSiNoExiste();
module.exports = CrearBaseSiNoExiste;
