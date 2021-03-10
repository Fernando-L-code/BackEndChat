const express = require('express');
//  o  esto solo en ES6
// import express from 'express';

const app = express();
const server = require('http').Server(app);

const socket = require('./socket');
const db = require('./db');

// const router = require('./components/message/network');
const router = require('./network/routes');

const config = require('./config');
db(config.dbUrl);

// ---------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended : true }));

// app.use(router);

socket.connect(server);
router(app);



//con esto indicamos el front end
app.use("/app", express.static('public'));

// app.use('/', function(req,res){
//     res.send('hola')
// });

server.listen(config.port, function(){
    console.log(`La aplicacion esta corriendo en http://localhost:${config.port}`);   
});