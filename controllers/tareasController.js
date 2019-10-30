const proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
	// obtenemos el proyecto actual
	const proyecto = await proyectos.findOne({
		where: {
			url: req.params.url
		}
	});
	// Leer el valor del input
	const { tarea } = req.body;

	// Estado 0 = incompleto y ID del Proyecto

	const estado = 0;
	const proyectoId = proyecto.id;

	// Insertar en la base de datos
	const resultado = await Tareas.create({ tarea, estado, proyectoId });

	if (!resultado) {
		return next();
	}

	// redireccionar
	res.redirect(`/proyectos/${req.params.url}`);
};
