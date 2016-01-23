var Q = require("q");
var nedb = require("nedb");
var rooms = new nedb({ filename: "./database/rooms", autoload: true });
var genId = require("gen-id")("xxxxxxxc");

// Room
/*
    id: room_id
    users: [ peerjs_id ]
*/

exports.create = function(peerid) { // Returns room id
    return Q.promise(function(resolve, reject) {
        var roomInfo = {
            id: genId.generate(),
            users: [ peerid ]
        };
        Q.ninvoke(rooms, "insert", roomInfo)
        .then(function(room) {
            resolve(room.id);
        })
        .fail(function(err) {
            reject(err);
        });
    });
};

exports.get = function(roomid) { // All peers
    return Q.promise(function(resolve, reject) {
        Q.ninvoke(rooms, "findOne", { id: roomid })
        .then(function(room) {
            if (!room) return reject(Error("Room does not exist"));
            resolve(room.users);
        })
        .fail(function(err) {
            reject(err);
        });
    });
};

exports.join = function(room, peerid) {
    return Q.promise(function(resolve, reject) {
        Q.ninvoke(rooms, "findOne", { id: roomid })
        .then(function(room) {
            if (!room) return reject(Error("Room does not exist"));
            room.users.push(peerid);
            Q.ninvoke(rooms, "update", { id: roomid }, { $set: room })
            .then(function() {
                resolve();
            });
        })
        .fail(function(err) {
            reject(err);
        });
    });
};