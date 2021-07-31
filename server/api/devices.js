const express = require('express')
const conn = require('../db/conn')
const Device = require('../models/device')

const router = new express.Router()

router.get("/devices",  async (req, res) => {
    let allDevices
    let db = conn.getDB()
    if(db) {
        allDevices = await Device.find({})
    }
    res.header("Content-Type",'application/json');
    res.send(allDevices)
    // res.send(JSON.stringify({ allPatients }, null, 4));
})

router.post("/devices", async (req, res) => {
    const device = new Device(req.body)
    try {
        await device.save()
        res.header("Content-Type",'application/json');
        res.status(201).send(device)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router