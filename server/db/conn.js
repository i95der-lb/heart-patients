const { MongoClient } = require('mongodb')
require("dotenv").config({ path: "./config.env" });
const mongoose = require('mongoose')


const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

const url = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`

// const client = new MongoClient(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

var _db

// const connectToDB = async () => {
//     await client.connect((err, client) => {
//         if (err) {
//             return console.log("Unable to Connect to Database")
//         }
//         console.log("Successfully Connected to Database")
//         _db = client.db(dbName)
//     })
// } 

const connectToDB = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },(err, client) => {
        if (err) {
            return console.log("Unable to Connect to Database")
        }
        console.log("Successfully Connected to Database")
        _db = client
    })
}

module.exports = {
    connectToDB,
    getDB: () => _db
}