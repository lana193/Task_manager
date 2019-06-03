const mongoose = require('mongoose');
const express = require('express');
const config = require('config');

const API_PORT = 3001;
const app = express();

app.use(express.json());

const router = express.Router();

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
    useCreateIndex: true,
    useFindAndModify: false }
);

let db = mongoose.connection;

db.once("open", () => console.log("Connected to the database"));

// Check if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Append /api for http requests
app.use("/api", router);

// Launch backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));