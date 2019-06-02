const mongoose = require('mongoose');
const express = require('express');
// const path = reguire('path');
const config = require('config');
// var cors = require('cors');
// const logger = require('morgan');
// const Data = require('./data');
// const passport = require("passport");

const API_PORT = 3001;
const app = express();
//app.use(cors());

// bodyParser, parses the request body to be a readable json format
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//app.use(logger("dev"));

const router = express.Router();
// Passport middleware
//app.use(passport.initialize());
// Passport config
//require("./config/passport")(passport);

// Use Routes
app.use('/api/tasks', require('./routes/api/tasks'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// DB Config
const dbRoute = config.get('mongoURI');

// Connect to Mongo DB
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true,
    useCreateIndex: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("Connected to the database"));

// Check if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Append /api for http requests
app.use("/api", router);

// Launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));