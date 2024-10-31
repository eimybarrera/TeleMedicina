// patient.route.js
import { Router } from 'express';
import { patientMethods } from '../controller/patient.controller.js';

const router = Router();

// Ruta para crear un nuevo paciente
router.post('/pacientes', patientMethods.createPatient);
router.post('/pacientes/login', patientMethods.getPatientByEmailAndPassword);
export default router;
