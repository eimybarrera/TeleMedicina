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
const getPatientByEmailAndPassword = async (req, res) => {
    try {
      const { email, contraseña } = req.body;
  
      if (!email || !contraseña) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
      }
  
      const connection = await getConnection();
      const [result] = await connection.query(
        `SELECT * FROM pacientes WHERE email = ? AND contraseña = ?`,
        [email, contraseña]
      );
  
      if (result.length > 0) {
        res.status(200).json({ message: 'Paciente encontrado', paciente: result[0] });
      } else {
        res.status(404).json({ error: 'Paciente no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  const updatePatient = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, contraseña, fecha_nacimiento, direccion, historial_medico, foto_perfil } = req.body;
  
      const connection = await getConnection();
      const result = await connection.query(
        `UPDATE pacientes SET nombre = ?, email = ?, contraseña = ?, fecha_nacimiento = ?, direccion = ?, historial_medico = ?, foto_perfil = ? 
         WHERE id_paciente = ?`, // Usando id_paciente
        [nombre, email, contraseña, fecha_nacimiento, direccion, historial_medico, foto_perfil, id]
      );
  
      res.status(200).json({ message: 'Paciente actualizado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  const deletePatient = async (req, res) => {
    try {
      const { id } = req.params;
  
      const connection = await getConnection();
      await connection.query(`DELETE FROM pacientes WHERE id_paciente = ?`, [id]); // Usando id_paciente
  
      res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  
export const patientMethods = {
  createPatient,
  getPatientByEmailAndPassword,
  updatePatient,
  deletePatient
};