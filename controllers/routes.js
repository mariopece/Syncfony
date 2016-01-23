var express = require("express");
var router = express.Router();
var notification = require("../middlewares/notification.js");
router.use(notification);

/* Rooms */
router.use("/room", require("./rooms.js"));

router.get("/", function(req, res, next) {
    // Stub
});

/* 404 & 500 */
router.use(function(req, res) {
    res.status(404).render("404", {
        title: "Page Not Found",
        user: req.user
    });
});

router.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500).render("500", {
        title: "Internal Server Error",
        user: req.user
    });
});

module.exports = router;