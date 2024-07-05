const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./.data/wimbledon.db");

const Usuario = sequelize.define("usuarios", {
  IdUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nombre: { type: DataTypes.TEXT, allowNull: false, unique: true },
  Clave: { type: DataTypes.TEXT, allowNull: false }
}, {
  timestamps: false
});

const Jugador = sequelize.define("jugadores", {
  IdJugador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nombre: { type: DataTypes.TEXT, allowNull: false },
  Nacionalidad: { type: DataTypes.TEXT },
  Ranking: { type: DataTypes.INTEGER },
  FechaNacimiento: { type: DataTypes.TEXT }
}, {
  timestamps: false
});

const Torneo = sequelize.define("torneos", {
  IdTorneo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nombre: { type: DataTypes.TEXT, allowNull: false },
  FechaInicio: { type: DataTypes.TEXT },
  FechaFin: { type: DataTypes.TEXT }
}, {
  timestamps: false
});

const Inscripcion = sequelize.define("inscripciones", {
  IdInscripcion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  IdJugador: { type: DataTypes.INTEGER, references: { model: Jugador, key: 'IdJugador' } },
  IdTorneo: { type: DataTypes.INTEGER, references: { model: Torneo, key: 'IdTorneo' } }
}, {
  timestamps: false
});

Jugador.hasMany(Inscripcion, { foreignKey: 'IdJugador' });
Inscripcion.belongsTo(Jugador, { foreignKey: 'IdJugador' });

Torneo.hasMany(Inscripcion, { foreignKey: 'IdTorneo' });
Inscripcion.belongsTo(Torneo, { foreignKey: 'IdTorneo' });

module.exports = { sequelize, Usuario, Jugador, Torneo, Inscripcion };
