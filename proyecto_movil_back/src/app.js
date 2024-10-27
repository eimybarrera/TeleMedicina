import express from 'express';
import morgan from 'morgan';
import router from './route/doctor.route.js';

const app = express();

//configuracion servidor/instancia
app.set('port', process.env.PORT || 3000); //puerto, puerto por defecto y numero de puerto

//middleware
app.use(morgan('dev'));
app.use(express.json());

//rutas
app.use('/', router);

export default app;
