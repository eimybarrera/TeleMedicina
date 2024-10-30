import { Router } from 'express';
import { metodosDoctor } from '../controller/doctor.controller.js';
import { infoDoctor } from '../controller/infodoctor.controller.js';

const router = Router();

router.get('/medicos', metodosDoctor.getDoctor);
router.get('/medicos/:id', infoDoctor.getInfoDoctor);

export default router;
