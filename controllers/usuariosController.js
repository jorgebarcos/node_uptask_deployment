exports.formCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear Cuenta en Uptask'
	});
};

const Usuarios = require('../models/Usuarios');

exports.crearCuenta = (req, res) => {
	// Leer los datos
	const { email, password } = req.body;

	// Crear el usuario
	Usuarios.create({
		email,
		password
	}).then(() => {
		res.redirect('/iniciar-sesion');
	});
};
