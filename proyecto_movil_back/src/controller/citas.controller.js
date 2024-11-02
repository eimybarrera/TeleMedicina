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

export const citas = {
  confirmarCita,
};
