// install npm does not download express.js
// ES2015 modules - import express from 'express'
// Instead...
// we are using Node.JS native syntax

// The following syntax is...
// CommonJS Modules
const express = require('express');
// express needs to be added individually

// bring in the hubs from your data
const Hubs = require('./data/hubs-model.js');


// This creates the server
const server = express();

// the second argument below is the route handler
// you can think of the entire block as an 'endpoint'
// the homies - request and response
server.get('/', (request, response) => {
    response.json({ hello: 'web26' })
})
// Needed for POST and PUT/PATCH requests
// it teaches Express how to read JSON from the body
server.use(express.json())

// VIEW (Read) a list of hubs
server.get('/api/hubs', (request, response) => {
    // get the hubs from the database
    Hubs.find().then((hubs) => {
        console.log("This is the list of hubs being returned:", hubs)
        response.status(200).json(hubs)
    }).catch((error) => {
        console.log("This is an error from get list of hubs:", error)
        response.status(500).json({ errorMessage: 'oops' })
    })
})

// GET with a POST request
server.post('/api/hubs', (request, response) => {
    // the data will be in the body of the (say, axios) request
    const hubInfo = request.body
    // validate the data, and if the data is valid save it...
    Hubs.add(hubInfo).then((hub) => {
        response.status(201).json(hub)
    }).catch((error) => {
        console.log("This is an error from adding hub:", error)
        response.status(500).json({ errorMessage: 'oops' })
    })
})

// DELETE
server.delete('/api/hubs/:id', (request, response) => {
    Hubs.remove(request.params.id).then((removed) => {
        response.status(200).json(removed)
    }).catch((error) => {
        console.log("Error from delete:", error)
        response.status(500).json({ errorMessage: 'oops' })
    })
})

// The port is like the apartment number
// You can more than one API running on the same computer
// They will be put at different...
// Ports

const port = 5000;
// listening effectively turns on the server
server.listen(port, () => console.log(`/n** API on port ${port} /n`))

// Steps:
// 1. npm i express
// 2. add an index.js to the root
// 3. use npm run server to start the api
// 4. hit the url/localhost port with a get request

// Requirements of an API:

//  Hub - is like a channel on a chat application
// a database is included; there is a JS file with a set
// of functions to work with the database

// Features:

// - view list of hubs
// - add a hub
// - remove a hub
// - update a hub

