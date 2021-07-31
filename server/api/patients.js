const express = require('express')
const conn = require('../db/conn')
const Patient = require('../models/patient')

const router = new express.Router()

router.get("/patients",  async (req, res) => {
    let allPatients
    let db = conn.getDB()
    if(db) {
        allPatients = await Patient.find({})
    }
    res.header("Content-Type",'application/json');
    res.send(allPatients)
    // res.send(JSON.stringify({ allPatients }, null, 4));
})

router.post("/patients", async (req, res) => {
    const patient = new Patient(req.body)
    try {
        await patient.save()
        res.header("Content-Type",'application/json');
        res.status(201).send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router