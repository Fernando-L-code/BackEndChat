const express = require('express');
//  o  esto solo en ES6
// import express from 'express';

const db = require('./db');

// const router = require('./components/message/network');
const router = require('./network/routes');

const url ='mongodb+srv://tester:1234@cluster0.cjrjs.mongodb.net/test?retryWrites=true&w=majority';
db(url);

// ---------------------------------------
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true }));

// app.use(router);

router(app);



//con esto indicamos el front end
app.use("/app", express.static('public'));

// app.use('/', function(req,res){
//     res.send('hola')
// });

app.listen(3000);
console.log('La aplicacion esta corriendo en http://localhost:3000');