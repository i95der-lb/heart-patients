# heart-patients

## Description & Data Models
This repository contains a small full stack project which shows and visualizes patient's heart data. The MERN stack was used to implement this project. 

There are three collections in this system: 
- patients
- devices 
- events

The data models of the collections were implemented with mongoose (https://www.npmjs.com/package/mongoose) and can be found in `server/db`.

The connection to the database is in `server/db/conn.js`

## APIs
Each collection has its own API file in `server/api.js`

Add a config.env file to the server directory, and add in it all the following variables: 
```
DB_HOST=localhost
DB_PORT=27017 (database port)
DB_USERNAME=myUserAdmin
DB_PASSWORD=myDBpassword
DB_NAME=heart-patients
PORT=5000 (server port)
```
Run both client and server with: 
``` 
cd server && npm run dev

```
## Client App
There are two main components in the client's App: 
- PatientTable.js
- Graph.js 

axios (https://www.npmjs.com/package/axios) was used to call the server APIs.<br />
Material-ui (https://www.npmjs.com/package/@material-ui/core) was used to style the App. <br />
The graph used highcharts (https://www.npmjs.com/package/highcharts).
