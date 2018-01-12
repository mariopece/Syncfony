var Promise = require("bluebird");
var nedb = require("nedb");
var rooms = new nedb({ filename: "./database/rooms", autoload: true });
var genId = require("gen-id")("xxxxxxxc");
Promise.promisifyAll(rooms);

// Room
/*
    id: room_id
    users: [ peerjs_id ]
*/

exports.create = function(peerid, nickname) { // Returns room id
    var roomInfo = {
        id: genId.generate(),
        users: [ { id: peerid, nickname: nickname} ]
    };
    return rooms.insertAsync(roomInfo);
};

exports.delete = function(roomid, peerid) {
    return rooms.findOneAsync({ id: roomid })
    .then(function(room) {
        if (!room) throw Error("Room does not exist");
        var pos = -1;
        room.users.forEach(function(e, i) {
            if (e.id === peerid) pos = i;
        });
        if (pos === -1) throw Error("User does not exist in room");
        room.users.splice(pos, 1);
        if (!room.users.length)
            return rooms.removeAsync({ id: roomid });
        else
            return rooms.updateAsync({ id: roomid }, { $set: room });

    });
};

exports.get = function(roomid) { // All peers
    return rooms.findOneAsync({ id: roomid })
    .then(function(room) {
        if (!room) throw Error("Room does not exist");
        return room.users;
    });
};

exports.join = function(roomid, peerid, nickname) {
    return rooms.findOneAsync({ id: roomid })
    .then(function(room) {
        if (!room) throw Error("Room does not exist");
        var present = false;
        room.users.forEach(function(e, i) {
            if (e.id === peerid) present = true;
        });
        if (!present) room.users.push({ id: peerid, nickname: nickname });
        return rooms.updateAsync({ id: roomid }, { $set: room });
    });
};