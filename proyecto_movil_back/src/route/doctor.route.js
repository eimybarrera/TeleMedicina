import { Router } from 'express';
import { metodosDoctor } from '../controller/doctor.controller.js';

const router = Router();

router.get('/medicos', metodosDoctor.getDoctor);

export default router;
