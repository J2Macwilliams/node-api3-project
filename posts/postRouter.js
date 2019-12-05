const express = require('express');

const router = express.Router();

router.use(express.json())

// Pull in Post Database
const postDb = require('../posts/postDb');

router.get('/', (req, res) => {
  // do your magic!
  postdb.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(() => {
      res.status(500).json({ message: "Error getting the posts" })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id
  postDb.getById(id)
    .then(id => {
      req.post = id
    })
    .catch(() => {
      res.status(400).json({ messge: "invalid post id" })
    })
}

module.exports = router;
