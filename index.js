const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
// const slug = require('slug');
// const expressValidator = require('express-validator');

// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexión a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync().then(() => console.log('Conectado al Servidor')).catch((error) => console.log(error));

// crear una app de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// pasar var dump a la aplicacion
app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	next();
});

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes());

app.listen(3000);
