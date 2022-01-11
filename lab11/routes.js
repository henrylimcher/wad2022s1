var express = require('express');
var db = require('./services/dataservice.js');

db.connect();

    var router = require('express').Router();

    router.use(express.urlencoded({
        extended: true
    }));

    /* GET /api/rooms is normally used for RETRIEVING ALL the rooms documents in the rooms collection */
    router.get('/api/rooms', function (req, res) {
        db.getRooms(function(err,rooms){
            if (err) {
                res.status(500).send("Unable to get all rooms");
            } else {
                res.status(200).send(rooms);
            }
        })
    })

    /* POST /api/rooms is normally used for ADDING a NEW ROOM document to the rooms collection */
    router.post('/api/rooms', function (req, res) {
        var data = req.body;
        db.addRoom(data.roomNumber,data.price,data.type,data.size,function(err,room){
            if (err) {
                res.status(500).send("Unable to add a new room");
            } else {
                res.status(200).send(room);
            }
        })
    });

    /* PUT /api/rooms is normally used for UPDATING an EXISTING ROOM document in the rooms collection */
    router.put('/api/rooms', function (req, res) {
        var data = req.body;
        db.updateRoomPrice(data.type, data.price, function(err,rooms){
            if (err) {
                res.status(500).send("Unable to update the rooms");
            } else {
                console.log(rooms);
                if (rooms==null || rooms.modifiedCount == 0) {
                    res.status(200).send("No rooms were updated");
                } else {
                    res.status(200).send("Rooms successfully updated");
                }
            }
        })
    });

    /* GET /api/rooms/:id is normally used for RETRIEVING a room documents based on the object id in the rooms collection */
    router.get('/api/rooms/:id', function (req, res) {
        var id = req.params.id;
        db.getRoomById(id,function(err,room) {
            if (err) {
                res.status(500).send("Unable to find a room with this id");
            } else {
                res.status(200).send(room);
            }
        });
    });

    /* POST /api/search is normally used for SEARCHING for room(s) based on some criteria in the rooms collection */
    router.post('/api/search', function (req, res) {
        var type = req.body.type;
        db.searchRoom(type,function(err,rooms) {
            if (err) {
                res.status(500).send("Unable to search rooms at this moment");
            } else {
                res.status(200).send(rooms);
            }
        })
    });

    /* DELETE /api/rooms/:roomType is normally used for delete room document(s) based on the roomType field from the rooms collection */
    router.delete('/api/rooms/:roomType', function (req, res) {
        var roomType = req.params.roomType;
        db.deleteRoomByType(roomType,function(err,rooms) {
            if (err) {
                res.status(500).send("Unable to delete rooms");
            } else {
                if (rooms==null || rooms.deletedCount == 0) {
                    res.status(200).send("No rooms were deleted");
                } else {
                    res.status(200).send("Rooms with the room type " + roomType + " are deleted.");
                }
            }
        })
    });


module.exports = router;
