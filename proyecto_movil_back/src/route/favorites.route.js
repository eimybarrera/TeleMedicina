import { Router } from 'express';
import { favoritos } from '../controller/favorites.controller.js';

const router = Router();

router.get('/favorites/:id_paciente', favoritos.obtenerFavoritos);
router.post('/favorites/toggle', favoritos.toggleFavorite);

export default router;