// Ejemplo de rutas de favoritos en el backend
const express = require('express');
const router = express.Router();
const db = require('./database'); // Asegúrate de importar correctamente la conexión a la base de datos

// Obtener favoritos de un usuario
router.get('/favoritos/:id_paciente', async (req, res) => {
    const { id_paciente } = req.params;
    try {
        const [favorites] = await db.query('SELECT * FROM favoritos WHERE id_paciente = ?', [id_paciente]);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching favorites' });
    }
});

// Agregar un favorito
router.post('/favoritos', async (req, res) => {
    const { id_paciente, doctor } = req.body;
    try {
        await db.query('INSERT INTO favoritos (id_paciente, id_medico)', 
            [id_paciente, id_medico ]);
        res.status(201).json({ message: 'Favorite added' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding favorite' });
    }
});

// Eliminar un favorito
router.delete('/favorites/:id_paciente/:id_medico', async (req, res) => {
    const { id_paciente, id_medico } = req.params;
    try {
        await db.query('DELETE FROM favoritos WHERE id_paciente = ? AND id_medico = ?', [id_paciente, doctor_id]);
        res.json({ message: 'Favorite removed' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing favorite' });
    }
});

module.exports = router;
