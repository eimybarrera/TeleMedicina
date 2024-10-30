import getConnection from '../database/database.js';

const getDoctor = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(`
      SELECT id_medico AS id, nombre AS name, e.nombre_especialidad AS specialty, 
              c.nombre_centro AS medicalCenter, calificacion AS rating, reseñas AS review, 
              foto_perfil AS imageUrl
      FROM medicos m
      LEFT JOIN especialidades e ON m.id_especialidad = e.id_especialidad
      LEFT JOIN centros_medicos c ON m.id_centro = c.id_centro
    `);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const metodosDoctor = {
  getDoctor,
};
