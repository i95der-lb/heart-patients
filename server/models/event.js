const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    type: String,
    heartRate: Number,
    date: Date,
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    }
})

const Event = new mongoose.model('Event', eventSchema)

module.exports = Event