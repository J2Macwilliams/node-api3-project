const express = require('express');

const router = express.Router();

router.use(express.json())


// Pull in Databases from Users and Posts
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
  const postInfo = req.body
  postDb.insert(postInfo)
    .then(createPost => {
      res.status(201).json(createPost)
    })
    .catch(() => {
      res.status(500).json({ message: "Error creating post" })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500), json({ message: "Error getting the users" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  userDb.getById(id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(() => {
      res.status(500).json({ message: "Error getting requested User" })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  postDb.getById(id)
    .then(foundPost => {
      res.status(200).json(foundPost)
    })
    .catch(() => {
      res.status(500).json({ message: `Error getting post by user: ${id}` })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  userDb.getById(id)
    .then(deletedUser => {
      if (deletedUser) {
        userDb.remove(id, deletedUser)
          .then(gone => {
            res.status(200).json({ message: "The user was deleted", deletedUser })
          })
          .catch(() => {
            res.status(500).json({ message: "There was an error deleting the user" })
          })
      } else {
        res.status(404).json({ message: "A user with that id doesn't exist" })
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Deleting the user not happening." })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  const postInfo = req.body

  userDb.getById(id)
    .then(found => {
      if (!postInfo) {
        res.status(400).json({ errorMessage: "Please provide an update" })
      } else {
        userDb.update(id, postInfo)
          .then(updatedUser => {
            res.status(200).json({ message: "Updated with", user: `${postInfo.name}` })
          })
          .catch((error) => {
            res.status(500).json({ message: "Error updating user", error })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "The Update had problems", error })
    })
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
