const passport = require('passport');

const Usuarios = require('../models/Usuarios');

exports.autenticarUsuario = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/iniciar-sesion',
	failureFlash: true,
	badRequestMessage: 'Ambos campos son obligatorios'
});

// Función para revisar si el usuario esta logeado o no
exports.usuarioAutenticado = (req, res, next) => {
	// si el usuario esta autenticado, adelante
	if (req.isAuthenticated()) {
		return next();
	}
	// sino esta autenticado, redirigir al formulario
	return res.redirect('/iniciar-sesion');
};

// Función para cerrar sesión
exports.cerrarSesion = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/iniciar-sesion'); // al cerrar sesion nos lleva al login
	});
};

// genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
	// verificar que el usuario existe
	const usuario = await Usuarios.findOne({
		where: {
			email: req.body.email
		}
	});

	// Si no existe el usuario
	if (!usuario) {
		req.flash('error', 'No existe esa cuenta');
		res.render('reestablecer', {
			nombrePagina: 'Reestablecer tu Contraseñar',
			mensajes: req.flash()
		});
	}
};
