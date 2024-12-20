import { Router } from 'express';
import { metodosCentrosYDoctores } from '../controller/CentrosMedicos.controller.js';

const router = Router();

router.get('/centros', metodosCentrosYDoctores.getMedicalCenterInfo);
router.get('/centros/:nombreCentro', metodosCentrosYDoctores.getMedicosPorCentro);

export default router;
