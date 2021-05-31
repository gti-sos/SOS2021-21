var cool = require('cool-ascii-faces')
var express = require('express')
var path = require("path");
var cors = require("cors")

var app = express()

var fire_api = require('./src/backend/fire_api/v2/index');
var temperature_api = require('./src/backend/temperature_api/v2/index');
var emision_api = require('./src/backend/emision_api/v2/index');

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

var port = process.env.PORT || 3000

app.use("/", express.static(path.join(__dirname,"public")));

//API REST Youssef
fire_api.register(app);

//API REST Paula
temperature_api.register(app);

//API REST Alejandro
emision_api.register(app);

//Habilitación de CORS para todas las rutas

app.use(cors())

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

app.listen(port, () => {
    console.log("Server ready listening on port " + port)
})
