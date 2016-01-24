var express = require("express");
var app = express();

require("./controllers/config.js")(app, express);
app.use(require("./controllers/routes.js"));

app.listen(process.env.PORT || 5000, process.env.IP || "127.0.0.1");
console.info("Listening on port " + (process.env.PORT || 5000) + ".");