const express = require('express')
const cors = require('cors')
const patientsAPI = require("./api/patients");
const devicesAPI = require("./api/devices");
const eventsAPI = require("./api/events");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(patientsAPI)
app.use(devicesAPI)
app.use(eventsAPI)


const conn = require('./db/conn')

app.listen(port, () => {
    //Connect to database
    conn.connectToDB()
    console.log(`Server is running on port: ${port}`);

})