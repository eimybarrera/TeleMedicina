import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import centerrouter from './route/Centrosmedicos.route.js';
import router from './route/doctor.route.js';
import patientRouter from './route/patient.route.js';

const app = express();

//configuracion servidor/instancia
app.set('port', process.env.PORT || 3000); //puerto, puerto por defecto y numero de puerto

//middleware
app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

//rutas
app.use('/', router);
app.use('/', patientRouter);
app.use('/', centerrouter);

export default app;
