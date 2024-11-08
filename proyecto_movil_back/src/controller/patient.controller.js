import getConnection from '../database/database.js';

const createPatient = async (req, res) => {
  try {
    const { nombre, email, contraseña, direccion, fecha_nacimiento, genero } = req.body;

    // Validación para asegurarse de que se proporcionen los campos obligatorios
    if (!nombre || !email || !contraseña || !direccion || !fecha_nacimiento || !genero) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, email, contraseña, direccion, fecha de nacimiento y genero' });
    }

    const connection = await getConnection();
    const result = await connection.query(
      `INSERT INTO pacientes (nombre, email, contraseña, direccion, fecha_nacimiento, genero) 
       VALUES (?, ?, ?, ?, ?, ?);`,
      [nombre, email, contraseña, direccion, fecha_nacimiento, genero]
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
    const [result] = await connection.query(`SELECT * FROM pacientes WHERE email = ? AND contraseña = ?`, [
      email,
      contraseña,
    ]);

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
const updatePassword = async (req, res) => {
  try {
    const { id } = req.params; // ID del paciente en la URL
    const { currentPassword, newPassword } = req.body; // Contraseña actual y nueva

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'La contraseña actual y la nueva son obligatorias' });
    }

    const connection = await getConnection();

    // Verificar si el paciente existe y la contraseña actual es correcta
    const [result] = await connection.query(`SELECT * FROM pacientes WHERE id_paciente = ? AND contraseña = ?`, [
      id,
      currentPassword,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado o contraseña actual incorrecta' });
    }

    // Actualizar la contraseña
    await connection.query(`UPDATE pacientes SET contraseña = ? WHERE id_paciente = ?`, [newPassword, id]);

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const patientMethods = {
  createPatient,
  getPatientByEmailAndPassword,
  updatePatient,
  deletePatient,
  updatePassword,
};
