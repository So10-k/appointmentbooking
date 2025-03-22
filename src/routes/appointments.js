const express = require('express');
const { Appointments } = require('../models/appointments');
const router = express.Router();

router.post('/appointments', async(request, response)=>{
    const {bookerid, title, starttime, endtime, reason, employeeid, notes} = request.body;
    try {
        const appointment = await Appointments.create({bookerid, title, starttime, endtime, reason, employeeid, notes})
        response.status(201).json(appointment)
    }
    catch(e){
        console.log(`Appointments route has errored: ${e}`)
    }
})
router.get('/appointments', async(request, response)=>{
    try {
        const appointment = await Appointments.find({})
        response.status(201).json(appointment)
    }
    catch(e){
        console.log(`Appointments route has errored: ${e}`)
    }
})