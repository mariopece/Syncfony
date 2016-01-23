var bodyParser = require("body-parser");
var compression = require("compression");
var exphbs = require("express-handlebars");
var morgan = require("morgan");

module.exports = function(app, express) {
    require("console-stamp")(console, {
        pattern: "dd mmm HH:MM:ss",
        colors: {
            stamp: "cyan",
            label: "magenta"
        }
    });

    morgan.token("time", function() {
        return dateFormat(new Date(), settings.TIME_FORMAT);
    });

    // Middleware
    app.use(compression());
    app.use(express.static("public"));
    app.use(morgan("[:time] :method :url :status :res[content-length] - :remote-addr - :response-time ms"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    var hbs = exphbs.create({
        defaultLayout: "default"
    });

    app.enable("case sensitive routing");
    app.enable("strict routing");
    app.disable("x-powered-by");
    app.engine("handlebars", hbs.engine);
    app.set("view engine", "handlebars");
};