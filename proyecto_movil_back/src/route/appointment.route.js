const express = require('express');
const router = express.Router();
const citasController = require('../controller/citas.controller');

router.get('/paciente/:id_paciente', citasController.getAppointmentsByPatient);
router.post('/confirmar', citasController.createAppointment);
router.put('/:id', citasController.updateAppointment);
router.delete('/:id', citasController.deleteAppointment);

module.exports = router;
