// patient.route.js
import { Router } from 'express';
import { patientMethods } from '../controller/patient.controller.js';

const router = Router();

// Ruta para crear un nuevo paciente
router.post('/pacientes', patientMethods.createPatient);
router.post('/pacientes/login', patientMethods.getPatientByEmailAndPassword);
router.put('/pacientes/:id', patientMethods.updatePatient); // Actualizar paciente por ID
router.delete('/pacientes/:id', patientMethods.deletePatient); // Eliminar paciente por ID
router.put('/pacientes/:id/cambiar-contrasena', patientMethods.updatePassword);


export default router;
