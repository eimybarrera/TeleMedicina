import getConnection from '../database/database.js';

const createPatient = async (req, res) => {
  try {
    const { nombre, email, contraseña, fecha_nacimiento, direccion, historial_medico, foto_perfil } = req.body;

    // Validación básica para asegurarse de que se proporcionen los campos obligatorios
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
    }

    const connection = await getConnection();
    const result = await connection.query(
      `INSERT INTO pacientes (nombre, email, contraseña, fecha_nacimiento, direccion, historial_medico, foto_perfil) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, email, contraseña, fecha_nacimiento, direccion, historial_medico, foto_perfil]
    );

    res.status(201).json({ message: 'Paciente creado exitosamente', id: result[0].insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const patientMethods = {
  createPatient,
};