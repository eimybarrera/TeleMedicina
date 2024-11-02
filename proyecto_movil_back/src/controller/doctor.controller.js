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

const getInfoDoctor = async (req, res) => {
  try {
    const connection = await getConnection();
    const id = req.params.id;
    const [result] = await connection.query(
      `
      SELECT 
        id_medico AS id, 
        nombre AS name, 
        e.nombre_especialidad AS specialty, 
        c.nombre_centro AS medicalCenter, 
        calificacion AS rating, 
        reseñas AS review,
        foto_perfil AS imageUrl,
        anos_experiencia AS experience,
        pacientes_atendidos AS patients,
        horario_trabajo AS workHours,
        biografia AS aboutme
      FROM 
        medicos m
      LEFT JOIN 
        especialidades e ON m.id_especialidad = e.id_especialidad
      LEFT JOIN 
        centros_medicos c ON m.id_centro = c.id_centro
      WHERE 
        m.id_medico = ?
    `,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getFechasDisponibles = async (req, res) => {
  try {
    const connection = await getConnection();
    const doctorId = req.params.id;
    const [dates] = await connection.query(
      `
      SELECT fecha 
      FROM fechas_disponibles 
      WHERE id_medico = ? AND estado = 'available'
    `,
      [doctorId]
    );

    res.json(dates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getHorasDisponibles = async (req, res) => {
  try {
    const connection = await getConnection();
    const doctorId = req.params.doctorId;
    const fechaId = req.params.fechaId;

    const [hours] = await connection.query(
      `
      SELECT hora 
      FROM horas_disponibles 
      WHERE id_medico = ? AND id_fecha = ? AND estado = 'available'
    `,
      [doctorId, fechaId]
    );

    res.json(hours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const metodosDoctor = {
  getDoctor,
  getInfoDoctor,
  getFechasDisponibles,
  getHorasDisponibles,
};
