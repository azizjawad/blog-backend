const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');

// Import Controllers 
const Auth   = require('./controller/auth');
const User   = require('./controller/users')
const Posts  = require('./controller/posts')

const app = express();

// Set a Server Port 
const port = process.env.PORT || 3000;

//Lets Connect to database
//Local DB Link: mongodb://localhost:27017/blog
let url = "mongodb+srv://admin:admin1212@node-blog.okf6u.mongodb.net/blog?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true } , (err) => {
  if (err) throw err;
  console.log("Mongo DB Connected!");
});

// Display Featured Images in the vue frontend
app.use('/uploads', express.static(__dirname+'/uploads'));

// Middleware
app.use(cors())
app.use(express.json());

// Routes Middleware
app.use('/api/user', Auth);
app.use('/api/get', User);
app.use('/api/posts', Posts);

app.get('/', (req, res) => {
    res.send(`Node Server is up and running on port ${port}`);
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));