let express = require('express');
require('dotenv').config()
let bodyParser = require('body-parser')
let app = express();
app.use("/public", express.static(__dirname + "/public"));
app.use("/", (req, res, next) => {
    const log = req.method + " " + req.path + " - " + req.ip;
    console.log(log);
    next();
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    })
})

app.use(bodyParser.urlencoded({extended: true}))

app.route("/name").get((req, res) => {
    res.json({
        name: req.query.first + ' ' + req.query.last
    });
}).post((req, res) => {
    res.json({
        name: req.body.first + ' ' + req.body.last
    })
})

app.get("/:word/echo", (req, res) => {
    res.json({
        echo: req.params.word
    })
})

app.get("/json", (req, res) => {
    const message = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
    res.json({
        "message": message
    });
})































 module.exports = app;
