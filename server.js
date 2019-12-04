const express = require('express');
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();

const userDb = require('./users/userDb');
// const postDb = require('./posts/postDb');



// endpoints---------------------------------------------------
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', validateUserId(id), userRoutes);
server.use('/api/posts', postRoutes);

// middleware--------------------------------------------------
server.use(logger);
server.use(validateUser);
server.use(validatePost);

//custom middleware--------------------------------------------
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl} `
  );
  next();
}

function validateUserId(id) {
  return function (req, res, next) {
    if (id && id === req.params.id) {
      userDb.insert(id)
      next();
    } else {
      res.status(400).json({ message: "invalid user id" })
    }
  }
}

function validateUser(req, res, next) {

}

function validatePost(req, res, next) {

}

module.exports = server;
