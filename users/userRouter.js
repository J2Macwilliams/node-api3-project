const express = require('express');

const router = express.Router();

router.use(express.json())



const userDb = require('./userDb');
const postDb = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const userInfo = req.body
  userDb.insert(userInfo)
    .then(createUser => {
      res.status(201).json(createUser)
    })
    .catch(() => {
      res.status(500).json({ message: "There was an error while saving the user to the database." })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!

});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id
  userDb.getById(id)
    .then(id => {
      req.user = id
    })
    .catch(() => {
      res.status(400).json({ message: "invalid user id" })
    })
  next();
}

function validateUser(req, res, next) {
  // do your magic!
  const userInfo = req.body;

  if (Object.values(userInfo).length <= 0) {
    res.status(400).json({ message: "missing user data" })
  } else if (!userInfo.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const postBody = req.body

  if (Object.values(postBody).length <= 0) {
    res.status(400).json({ message: "missing post data" })
  } else if (!postBody.text) {
    res.status(400).json({ message: "missing required text field" })
  }
  next();
}

module.exports = router;
