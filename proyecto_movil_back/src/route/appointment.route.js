import { Router } from 'express';
import { citas } from '../controller/citas.controller.js';

const router = Router();

router.post('/confirm', citas.confirmarCita);
router.get('/:id_paciente', citas.obtenerCitas);

export default router;
