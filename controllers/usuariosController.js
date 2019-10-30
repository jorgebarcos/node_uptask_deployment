exports.formCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear Cuenta en Uptask'
	});
};

const Usuarios = require('../models/Usuarios');

exports.crearCuenta = async (req, res) => {
	// Leer los datos
	const { email, password } = req.body;

	try {
		// Crear el usuario
		await Usuarios.create({
			email,
			password
		});
		res.redirect('/iniciar-sesion');
	} catch (error) {
		res.render('crearCuenta', {
			error: error.erros,
			nombrePagina: 'Crear Cuenta en Uptask'
		});
	}
};
