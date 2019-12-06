const express = require('express');
const cors = require('cors');
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use(cors());

// endpoints---------------------------------------------------
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRoutes);
server.use('/api/posts',  postRoutes);

// middleware--------------------------------------------------
server.use(logger);


//custom middleware--------------------------------------------
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl} `
  );
  next();
}

module.exports = server;
