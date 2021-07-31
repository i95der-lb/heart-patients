const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: String,
    dateOfBirth: Date,
    studyStartTime: Date,
    studyEndTime: Date,
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Device'
    }
})

patientSchema.virtual('events', {
    ref: 'Event', 
    localField: '_id',
    foreignField: 'patientId'
})

const Patient = new mongoose.model('Patient', patientSchema)

module.exports = Patient