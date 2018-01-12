var express = require("express");
var router = express.Router();
var room = require("../models/room.js");

router.get("/", function(req, res) {
    res.render("room", {
        layout: false
    });
});

router.post("/create", function(req, res) { // { client: id }
    console.log("Creating room");
    room.create(req.body.client, req.body.nickname)
    .then(function(room) {
        res.json({ room: room.id });
    })
    .catch(function(err) {
        console.error(err.stack);
        res.status(400).json({ error: err.message });
    });
});

router.post("/delete", function(req, res) {
    room.delete(req.body.room, req.body.client)
    .then(function() {
        res.end();
    })
    .catch(function(err) {
        console.error(err.stack);
        res.status(400).json({ error: err.message });
    });
});

router.post("/join", function(req, res) { // { room: id, client: id }
    room.join(req.body.room, req.body.client, req.body.nickname)
    .then(function() {
        return room.get(req.body.room);
    })
    .then(function(peerids) {
        res.json({ "clients": JSON.stringify(peerids) });
    })
    .catch(function(err) {
        console.error(err.stack);
        res.status(400).json({ error: err.message });
    });
});

module.exports = router;