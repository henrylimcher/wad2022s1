var express = require('express');
var eventsController = require('./controllers/eventsController.js');
var organizersController = require('./controllers/organizersController.js');

    var router = require('express').Router();
    
    router.use(express.urlencoded({
        extended: true
    }));
    router.get('/', function(req, res) {
        res.sendFile(__dirname+"/views/index.html");
    });
    router.get('/organizer', function(req, res) {
        res.sendFile(__dirname+"/views/organizer.html");
    });

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+"/views/"+req.originalUrl);
    });

    router.get('/events',function(req,res){
        res.send(eventsController.getEvents());
    })
    router.post('/events', function(req, res) {
        var data = req.body;
        
        var event = {
            name: data.name,
            description: data.description,
            start: {
                date: data.startDate,
                time: data.startTime
            },
            end: {
                date: data.endDate,
                time: data.endTime
            },
            organizer: data.organizer   //challeng ex
        };
        
        eventsController.addEvent(event);     
        res.redirect('back');        
    });

    router.get('/organizers',function(req,res){
        res.send(organizersController.getOrganizers());
    })

    router.post('/organizers', function(req,res){
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
