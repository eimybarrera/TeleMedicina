import getConnection from '../database/database.js';

// Agregar o quitar de favs
const toggleFavorite = async (req, res) => {
try {
    const connection = await getConnection();
    const { id_paciente, id_doctor } = req.body;

    const [rows] = await connection.query(
      `SELECT * FROM favoritos WHERE id_paciente = ?`,
    [id_paciente, id_doctor]
    );

    if (rows.length > 0) {
      // Si existe quitarlo
    await connection.query(
        `DELETE FROM favoritos WHERE id_paciente = ? AND id_doctor = ?`,
        [id_paciente, id_doctor]
    );
    res.json({ message: 'Eliminado de favoritos' });
    } else {
      // Sino, agregarlo
    await connection.query(
        `INSERT INTO favoritos (id_paciente, id_doctor) VALUES (?, ?)`,
        [id_paciente, id_doctor]
    );
    res.json({ message: 'Agregado a favoritos' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
}
};

// todos los favs del paciente
const obtenerFavoritos = async (req, res) => {
try {
    const connection = await getConnection();
    const { id_paciente } = req.params;

    const [rows] = await connection.query(
    `SELECT d.id_doctor, d.nombre, d.especialidad FROM favoritos f
    JOIN doctores d ON f.id_doctor = d.id_doctor
    WHERE f.id_paciente = ?`,
    [id_paciente]
    );

    res.json(rows);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener favoritos' });
}
};

export const favoritos = {
toggleFavorite,
obtenerFavoritos,
};
