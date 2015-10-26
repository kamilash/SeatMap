"use strict";
var express = require('express');
var app = express();
var seatMap = require('./seatMapAlgorithm.js');

app.use(express.static(__dirname + '/public'));
app.get("/students", (function (request, response) {
    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'content-type': 'application/json' });
    var studentsFromSchoolServer = ([   
        { name: "Leonardo", position: 1, grade: 8, height: 150 },
        { name: "Rafaela", position: 2, grade: 7, height: 140 },
        { name: "Marcos", position: 3, grade: 3, height: 170 },
        { name: "Diego", position: 4, grade: 9, height: 160 },
        { name: "Marcela", position: 5, grade: 10, height: 130 },
        { name: "Lucas", position: 6, grade: 4, height: 140 },
        { name: "Aline", position: 7, grade: 9, height: 135 },
        { name: "Maria", position: 8, grade: 10, height: 180 },
        { name: "Pedro", position: 9, grade: 6, height: 150 }
    ]);
    var seatMapResponse = { classroom101: seatMap.getSeatMap(studentsFromSchoolServer) };
    console.log();
    response.end(JSON.stringify(seatMapResponse));
}));
app.listen(process.env.PORT || 8080);
console.log("Listening on port 8080");
