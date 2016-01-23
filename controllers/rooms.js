var express = require("express");
var router = express.Router();
var room = require("../models/room.js");

router.post("/create", function(req, res) { // { client: id }
    room.create(req.body.client)
    .then(function(roomid) {
        res.json({ "room": id });
    })
    .fail(function(err) {
        console.error(err);
        res.status(400).json({ "error": err.message });
    });
});

router.post("/join", function(req, res) { // { room: id, client: id }
    room.join(req.body.room, req.body.client)
    .then(room.get(req.body.room))
    .then(function(peerids) {
        res.json({ "clients": peerids });
    })
    .fail(function(err) {
        console.error(err);
        res.status(400).json({ "error": err.message });
    });
});

module.exports = router;