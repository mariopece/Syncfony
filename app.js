var express = require("express");
var app = express();

require("./controllers/config.js")(app, express);
app.use(require("./controllers/routes.js"));

app.listen(8080);
console.info("Listening on port 8080.");