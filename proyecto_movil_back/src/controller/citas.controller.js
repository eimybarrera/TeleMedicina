import getConnection from '../database/database.js';

const confirmarCita = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_paciente, id_medico, id_fecha, id_hora } = req.body;

    await connection.query(
      `UPDATE horas_disponibles SET estado = 'unavailable' WHERE id_hora = ? AND id_medico = ? AND id_fecha = ?`,
      [id_hora, id_medico, id_fecha]
    );

    // Insertar la cita en la tabla citas
    await connection.query(
      `
      INSERT INTO citas (id_paciente, id_medico, id_fecha, id_hora, estado_cita)
      VALUES (?, ?, ?, ?, 'confirm')
    `,
      [id_paciente, id_medico, id_fecha, id_hora]
    );

    res.json({ message: 'Cita confirmada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const confirmarCita1 = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_paciente, id_doctor, fecha, hora } = req.body;

    // Insertar la cita en la tabla de citas1
    await connection.query(
      `
      INSERT INTO citas1 (id_paciente, id_doctor, fecha, hora, estado)
      VALUES (?, ?, ?, ?, 'pendiente')
    `,
      [id_paciente, id_doctor, fecha, hora]
    );

    res.json({ message: 'Cita confirmada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerCitas = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id_paciente } = req.params;

    const [rows] = await connection.query(`SELECT * FROM citas WHERE id_paciente = ? `, [id_paciente]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

export const citas = {
  confirmarCita,
  obtenerCitas,
  confirmarCita1,
};
