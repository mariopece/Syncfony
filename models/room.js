var Q = require("q");
var nedb = require("nedb");
var rooms = new nedb({ filename: "./database/rooms", autoload: true });
var genId = require("gen-id")("xxxxxxxc");

// Room
/*
    id: room_id
    users: [ peerjs_id ]
*/

exports.create = function(peerid, nickname) { // Returns room id
    return Q.promise(function(resolve, reject) {
        var roomInfo = {
            id: genId.generate(),
            users: [ { "id": peerid, "nickname": nickname} ]
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

exports.delete = function(roomid, peerid) {
    return Q.promise(function(resolve, reject) {
        Q.ninvoke(rooms, "findOne", { id: roomid })
        .then(function(room) {
            if (!room) return reject(Error("Room does not exist"));
            console.log(room);
            for (var a = 0; a < room.users.length; ++a)
                if (room.users[a].id === peerid) {
                    room.users.splice(a, 1);
                    break;
                }
            if (!room.users.length)
                Q.ninvoke(rooms, "remove", { id: roomid })
                .then (function() {
                    resolve();
                });
            else
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

exports.join = function(roomid, peerid, nickname) {
    return Q.promise(function(resolve, reject) {
        Q.ninvoke(rooms, "findOne", { id: roomid })
        .then(function(room) {
            if (!room) return reject(Error("Room does not exist"));
            var present = false;
            for (var a = 0; a < room.users.length; ++a)
                if (room.users[a].id === peerid) {
                    present = true;
                    break;
                }
            if (!present)
                room.users.push({ "id": peerid, "nickname": nickname });
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