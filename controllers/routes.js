var express = require("express");
var router = express.Router();

/* Rooms */
router.use("/room", require("./rooms.js"));

router.get("/", function(req, res) {
    res.render("index", {
        layout: false
    });
});

/* 404 & 500 */
router.use(function(req, res) {
    res.status(404).send("404: Not Found");
});

router.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500).send("500: Internal Server Error");
});

module.exports = router;