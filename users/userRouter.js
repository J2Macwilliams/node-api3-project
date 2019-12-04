const express = require('express');

const router = express.Router();

router.use(express.json())

router.use(validateUserId);
router.use(validateUser);
router.use(validatePost);

const userDb = require('./userDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  if (id && id === req.params.id) {
    userDb.insert(id)
    next();
  } else {
    res.status(400).json({ message: "invalid user id" })
  }

}

function validateUser(req, res, next) {
  // do your magic!
  const userBody = req.body;
  const userName = req.body.name;

  if (!userBody) {
    res.status(400).json({ message: "missing user data" })
  } else if (!userName) {
    res.status(400).json({ message: "missing required name field" })
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const postBody = req.body
  const text = req.body.text

  if (!postBody) {
    res.status(400).json({ message: "missing post data" })
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" })
  }
  next();
}

module.exports = router;
