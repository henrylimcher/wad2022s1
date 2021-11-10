var express = require('express');
var eventsController = require('./controllers/eventsController.js');


    var router = require('express').Router();
    
    router.use(express.urlencoded({
        extended: true
    }));
    router.get('/', function(req, res) {
        res.sendFile(__dirname+"/views/index.html");
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
            }
        };
        
        eventsController.addEvent(event);     
        res.redirect('back');        
    });


module.exports = router;
