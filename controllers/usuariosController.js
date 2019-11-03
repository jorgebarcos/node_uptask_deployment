const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear Cuenta en Uptask'
	});
};

exports.formIniciarSesion = (req, res) => {
	const { error } = res.locals.mensajes;
	res.render('iniciarSesion', {
		nombrePagina: 'Iniciar Sesión en Uptask',
		error
	});
};

exports.crearCuenta = async (req, res) => {
	// Leer los datos
	const { email, password } = req.body;

	try {
		// Crear el usuario
		await Usuarios.create({
			email,
			password
		});

		// Crear una URL de confirmar
		const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

		// crear el objeto  de usuario
		const usuario = {
			email
		};

		// enviar email
		await enviarEmail.enviar({
			usuario,
			subject: 'Confirma tu cuenta UpTasl',
			confirmarUrl,
			archivo: 'confirmar-cuenta'
		});

		// redirigir al usuario
		req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');

		res.redirect('/iniciar-sesion');
	} catch (error) {
		req.flash('error', error.errors.map((error) => error.message));
		res.render('crearCuenta', {
			mensajes: req.flash(),
			nombrePagina: 'Crear Cuenta en Uptask',
			email,
			password
		});
	}
};

exports.formRestablecerPassword = (req, res) => {
	res.render('reestablecer', {
		nombrePagina: 'Reestablecer tu Contraseña'
	});
};
