import { Router } from 'express';
import { favorites } from '../controller/favorites.controller.js';

const router = Router();

router.get('/favorites/:id_paciente', favorites.getFavoritesByPaciente);

export default router;
