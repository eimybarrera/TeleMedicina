import getConnection from '../database/database.js';

const getDoctor = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query('SELECT * FROM medicos');
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
