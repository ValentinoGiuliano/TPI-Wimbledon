const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  try {
    await db.open("./.data/wimbledon.db");
    console.log("Base de datos abierta");

    let res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'usuarios'");
    if (res.contar === 0) {
      await db.run("CREATE table usuarios(IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL)");
      console.log("Tabla usuarios creada!");
      await db.run("INSERT INTO usuarios (Nombre, Clave) VALUES ('admin', '123'), ('juan', '123')");
      console.log("Usuarios insertados!");
    } else {
      console.log("Tabla usuarios ya existe");
    }

    res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'jugadores'");
    if (res.contar === 0) {
      await db.run("CREATE table jugadores(IdJugador INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, Nacionalidad text, Ranking integer, FechaNacimiento text)");
      console.log("Tabla jugadores creada!");
      await db.run(`INSERT INTO jugadores (Nombre, Nacionalidad, Ranking, FechaNacimiento) VALUES
        ('Novak Djokovic', 'Serbia', 1, '1987-05-22'),
        ('Carlos Alcaraz', 'España', 2, '2003-05-05'),
        ('Daniil Medvedev', 'Rusia', 3, '1996-02-11'),
        ('Casper Ruud', 'Noruega', 4, '1998-12-22'),
        ('Stefanos Tsitsipas', 'Grecia', 5, '1998-08-12'),
        ('Andrey Rublev', 'Rusia', 6, '1997-10-20'),
        ('Alexander Zverev', 'Alemania', 7, '1997-04-20'),
        ('Holger Rune', 'Dinamarca', 8, '2003-04-29'),
        ('Taylor Fritz', 'EE.UU.', 9, '1997-10-28'),
        ('Hubert Hurkacz', 'Polonia', 10, '1997-02-11'),
        ('Felix Auger-Aliassime', 'Canadá', 11, '2000-08-08'),
        ('Cameron Norrie', 'Reino Unido', 12, '1995-08-23'),
        ('Jannik Sinner', 'Italia', 13, '2001-08-16'),
        ('Matteo Berrettini', 'Italia', 14, '1996-04-12'),
        ('Frances Tiafoe', 'EE.UU.', 15, '1998-01-20'),
        ('Karen Khachanov', 'Rusia', 16, '1996-05-21'),
        ('Diego Schwartzman', 'Argentina', 17, '1992-08-16'),
        ('Grigor Dimitrov', 'Bulgaria', 18, '1991-05-16'),
        ('Denis Shapovalov', 'Canadá', 19, '1999-04-15'),
        ('Roberto Bautista Agut', 'España', 20, '1988-04-14'),
        ('Pablo Carreno Busta', 'España', 21, '1991-07-12'),
        ('John Isner', 'EE.UU.', 22, '1985-04-26'),
        ('Daniel Evans', 'Reino Unido', 23, '1990-05-23'),
        ('Tommy Paul', 'EE.UU.', 24, '1997-05-17'),
        ('Lorenzo Sonego', 'Italia', 25, '1995-05-11'),
        ('Miomir Kecmanovic', 'Serbia', 26, '1999-08-31'),
        ('Borna Coric', 'Croacia', 27, '1996-11-14'),
        ('Ugo Humbert', 'Francia', 28, '1998-06-26'),
        ('Filip Krajinovic', 'Serbia', 29, '1992-02-27'),
        ('Reilly Opelka', 'EE.UU.', 30, '1997-08-28'),
        ('Alexander Bublik', 'Kazajistán', 31, '1997-06-17'),
        ('Marton Fucsovics', 'Hungría', 32, '1992-02-08')`);
      console.log("Jugadores insertados!");
    } else {
      console.log("Tabla jugadores ya existe");
    }

    res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'torneos'");
    if (res.contar === 0) {
      await db.run("CREATE table torneos(IdTorneo INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, FechaInicio text, FechaFin text)");
      console.log("Tabla torneos creada!");
      await db.run(`INSERT INTO torneos (Nombre, FechaInicio, FechaFin) VALUES
        ('Wimbledon 2024 Masculino', '2024-06-28', '2024-07-11'),
        ('Wimbledon 2024 Femenino', '2024-06-28', '2024-07-11'),
        ('Wimbledon 2024 Juniors', '2024-06-28', '2024-07-11'),
        ('Wimbledon 2024 Dobles', '2024-06-28', '2024-07-11'),
        ('Wimbledon 2023 Masculino', '2023-06-28', '2023-07-11'),
        ('Wimbledon 2023 Femenino', '2023-06-28', '2023-07-11'),
        ('Wimbledon 2023 Juniors', '2023-06-28', '2023-07-11'),
        ('Wimbledon 2023 Dobles', '2023-06-28', '2023-07-11'),
        ('Wimbledon 2022 Masculino', '2022-06-28', '2022-07-11'),
        ('Wimbledon 2022 Femenino', '2022-06-28', '2022-07-11')`);
      console.log("Torneos insertados!");
    } else {
      console.log("Tabla torneos ya existe");
    }

    res = await db.get("SELECT count(*) as contar FROM sqlite_master WHERE type = 'table' and name= 'inscripciones'");
    if (res.contar === 0) {
      await db.run("CREATE table inscripciones(IdInscripcion INTEGER PRIMARY KEY AUTOINCREMENT, IdJugador INTEGER, IdTorneo INTEGER, FOREIGN KEY(IdJugador) REFERENCES jugadores(IdJugador), FOREIGN KEY(IdTorneo) REFERENCES torneos(IdTorneo), UNIQUE(IdJugador, IdTorneo))");
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
