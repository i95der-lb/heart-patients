const express = require('express')
const conn = require('../db/conn')
const Patient = require('../models/patient')

const router = new express.Router()

router.get("/patients", async (req, res) => {
    let allPatients
    let db = conn.getDB()
    if (db) {
        allPatients = await Patient.aggregate([{
            $lookup: {
                from: 'devices',
                localField: 'deviceId',
                foreignField: '_id',
                as: 'deviceInfo'
            }
        }, {
            $addFields: {
                deviceSerialNumber: {
                    $last: "$deviceInfo.serialNumber"
                }
            }
        }, {
            $project: {
                deviceId: 0,
                deviceInfo: 0
            }
        }, {
            $lookup: {
                from: 'events',
                localField: '_id',
                foreignField: 'patientId',
                as: 'events'
            }
        }, {
            $addFields: {
                totalNumberOfEvents: {
                    $size: "$events"
                }
            }
        }, {
            $project: {
                events: 0
            }
        }])

    }
    res.header("Content-Type", 'application/json');
    res.send(allPatients)
    // res.send(JSON.stringify({ allPatients }, null, 4));
})

router.post("/patients", async (req, res) => {
    const patient = new Patient(req.body)
    try {
        await patient.save()
        res.header("Content-Type", 'application/json');
        res.status(201).send(patient)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router