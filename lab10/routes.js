var express = require('express');
var db = require('./services/dataservice.js');
db.connect();

var organizersController = require('./controllers/organizersController.js');    //will not touch on this for this lab. remain as it is

    var router = require('express').Router();

    router.use(express.urlencoded({
        extended: true
    }));

    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/index.html");
    });

    router.get('/organizer', function (req, res) {
        res.sendFile(__dirname + "/views/organizer.html");
    });

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });

    router.get('/events', function (req, res) {
        db.getAllEvents(function (err, events) {
            res.send(events);
        })
    })

    router.get('/events/:id', function (req, res) {
        var id = req.params.id;
        db.getEvent(id, function (err, event) {
            res.send(event);
        })
    })

    router.post('/events', function (req, res) {
        var data = req.body;
        db.addEvent(data.name, data.description, data.startDate, data.startTime, data.endDate, data.endTime,
            function (err, event) {
                console.log(event);
                res.redirect('back');
            })
    });

    router.get('/edit', function (req, res) {
        res.sendFile(__dirname + "/views/editEvent.html");
    });

    router.put('/events', function (req, res) {
        var data = req.body;
        db.updateEvent(data.id, data.name, data.description, data.startDate, data.startTime, data.endDate, data.endTime,
            function (err, event) {
                res.end();
            });
    })

    router.delete('/events/:id', function (req, res) {
        var id = req.params.id;
        db.deleteEvent(id, function (err, event) {
            res.end();
        });
    })

    router.get('/organizers', function (req, res) {
        res.send(organizersController.getOrganizers());
    })

    router.post('/organizers', function (req, res) {
        var data = req.body;
        var organizer = {
            name: data.name,
            username: data.username,
            company: data.company,
            password: data.password
        }
        organizersController.addOrganizer(organizer);
        res.redirect('back');
    })



module.exports = router;
