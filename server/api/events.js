const express = require('express')
const conn = require('../db/conn')
const Event = require('../models/event')

const router = new express.Router()

router.get("/events",  async (req, res) => {
    let allEvents
    let db = conn.getDB()
    if(db) {
        allEvents = await Event.find({})
    }
    res.header("Content-Type",'application/json');
    res.send(allEvents)
    // res.send(JSON.stringify({ allPatients }, null, 4));
})

router.post("/events", async (req, res) => {
    const event = new Event(req.body)
    try {
        await event.save()
        res.header("Content-Type",'application/json');
        res.status(201).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router