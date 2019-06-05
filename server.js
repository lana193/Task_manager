const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const CONNECTION_URI = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:3001/'//config.get('mongoURI');

// Connect to Mongo
mongoose.connect(CONNECTION_URI, 
    { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false }
)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/tasks', require('./routes/api/tasks'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 3001;

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use('/', express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});