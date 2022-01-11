var mongoose = require('mongoose');
var schema = mongoose.Schema;
var roomSchema = {};
var roomModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/RestApiDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                roomSchema = schema({
                    roomNumber: Number,
                    price: String,
                    type: String,
                    size: Number
                });
                var connection = mongoose.connection;
                roomModel = connection.model("rooms", roomSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addRoom: function(rn, p, t, s, callback){
        var newRoom = new roomModel({
            roomNumber: rn,
            price: p,
            type: t,
            size: s
        });
        newRoom.save(callback);
    },
    getRooms: function(callback){
        roomModel.find({}, callback);
    },
    searchRoom: function(t,callback) {
        // roomModel.find({type : t},callback); <--- allow search strictly exact match, case sensitive
        roomModel.find({type: new RegExp(t,'i')},callback); // <--- allow search regardless of case (more relaxed search)
    },
    getRoomById:function(id,callback){
        roomModel.findById(id, callback);
    },
    updateRoomPrice: function(t,p,callback){
        roomModel.updateMany({type:t},{price:p},callback);
    },
    deleteRoomByType: function(t,callback){
        roomModel.deleteMany({type:t},callback);
    }
};

module.exports = database;