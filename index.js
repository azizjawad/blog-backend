const express = require("express");
const app = express();
const mongoose = require('mongoose');

// Import Routes 
const authRoute = require('./routes/auth');

// Set a Server Port 
const port = 3000;

// Connect to database
let url = "mongodb://localhost:27017/blog";
mongoose.connect(url, { useNewUrlParser: true } , (err) => {
  if (err) throw err;
  console.log("Mongo DB Connected!");
});

// Middleware
app.use(express.json());

// Routes Middleware
app.use('/api/user',authRoute);

app.listen(port, () => console.log(`Server is up and running on port ${port}`));