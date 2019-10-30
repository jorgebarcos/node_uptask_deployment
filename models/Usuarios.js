const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define(
	'usuario',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: Sequelize.STRING(60),
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'Agrega un Correo Válido'
				},
				notEmpty: {
					mgs: 'El password no puede ir vacio'
				}
			},
			unique: {
				args: true,
				mgs: 'Usuario Ya Registrado'
			}
		},
		password: {
			type: Sequelize.STRING(60),
			allowNull: false,
			validate: {
				notEmpty: {
					mgs: 'El password no puede ir vacio'
				}
			}
		}
	},
	{
		hooks: {
			beforeCreate(usuario) {
				usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
			}
		}
	}
);

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
