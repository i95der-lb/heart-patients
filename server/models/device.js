const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    serialNumber: Number
})

deviceSchema.virtual('patients', {
    ref: 'Patient', 
    localField: '_id',
    foreignField: 'deviceId'
})

const Device = new mongoose.model('Device', deviceSchema)

module.exports = Device