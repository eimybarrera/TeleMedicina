import getConnection from '../database/database.js';

const getMedicalCenterInfo = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT 
        c.id_centro AS id,
        c.nombre_centro AS nombre,
        c.foto_centro AS foto
      FROM 
        centros_medicos c
    `
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getMedicosPorCentro = async (req, res) => {
  try {
    const connection = await getConnection();
    const nombreCentro = req.params.nombreCentro; // Asegúrate de que este es el parámetro correcto
    const [result] = await connection.query(
      `
      SELECT 
        id_medico AS id, 
        nombre AS name, 
        e.nombre_especialidad AS specialty, 
        c.nombre_centro AS medicalCenter, 
        calificacion AS rating, 
        reseñas AS review,
        foto_perfil AS imageUrl
      FROM 
        medicos m
      LEFT JOIN 
        especialidades e ON m.id_especialidad = e.id_especialidad
      LEFT JOIN 
        centros_medicos c ON m.id_centro = c.id_centro
      WHERE 
        c.nombre_centro = ?`,
      [nombreCentro]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'No se encontraron médicos para este centro' });
    }

    res.json(result);
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar las funciones
export const metodosCentrosYDoctores = {
  getMedicalCenterInfo,
  getDoctorInfo,
};
