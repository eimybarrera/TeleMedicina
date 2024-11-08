import { Router } from 'express';
import { citas } from '../controller/citas.controller.js';
import { metodosDoctor } from '../controller/doctor.controller.js';

const router = Router();

router.get('/medicos', metodosDoctor.getDoctor);
router.get('/medicos/:id', metodosDoctor.getInfoDoctor);
router.get('/medicos/:id/resena', metodosDoctor.getDoctorReviews);
router.get('/medicos/:id/fechas-disponibles', metodosDoctor.getFechasDisponibles);
router.get('/medicos/:doctorId/fechas-disponibles/:fechaId/horas-disponibles', metodosDoctor.getHorasDisponibles);

router.post('/citas/confirmar', citas.confirmarCita);

export default router;
