const express = require('express');
const { Appointments } = require('../models/appointments');
const router = express.Router();

router.post('/appointments', async (request, response) => {
    const { bookerid, title, startdate, enddate, reason, employeeid, notes } = request.body; // Use startdate and enddate
    try {
        const appointment = await Appointments.create({ bookerid, title, startdate, enddate, reason, employeeid, notes });
        response.status(201).json(appointment);
    } catch (e) {
        console.log(`Appointments route has errored: ${e}`);
        response.status(500).json({ error: 'Failed to create appointment' });
    }
});

router.get('/appointments', async (request, response) => {
    try {
        const appointments = await Appointments.findAll(); // Use findAll instead of find
        response.status(200).json(appointments);
    } catch (e) {
        console.log(`Appointments route has errored: ${e}`);
        response.status(500).json({ error: 'Failed to fetch appointments' });
    }
});
router.put('/appointments/:id/note', async (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;

    try {
        const appointment = await Appointments.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.notes = notes;
        await appointment.save();
        res.status(200).json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update note' });
    }
});

router.get('/appointments/user/:bookerid', async (req, res) => {
    const { bookerid } = req.params;

    try {
        const appointments = await Appointments.findAll({ where: { bookerid } });
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

module.exports = router;