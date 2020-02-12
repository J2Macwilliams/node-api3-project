const express = require('express');

const router = express.Router();

router.use(express.json())

// Pull in Post Database
const postDb = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  postDb.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(() => {
      res.status(500).json({ message: "Error getting the posts" })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  postDb.getById(id)
    .then(found => {
      res.status(200).json(found)
    })
    .catch(() => {
      res.status(500).json({ message: "Error getting requested post" })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  postDb.getById(id)
    .then(deletedPost => {
      if (deletedPost) {
        postDb.remove(id, deletedPost)
          .then(gone => {
            res.status(200).json({ message: "The post was deleted", deletedPost })
          })
          .catch(() => {
            res.status(500).json({ message: "There was an error deleting the post" })
          })
      } else {
        res.status(404).json({ message: "A Post with that id doesn't exist" })
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Deleting the post...Not Happening!" })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  const postInfo = req.body

  postDb.getById(id)
    .then(found => {
      if (!postInfo) {
        res.status(400).json({ errorMessage: "Please provide an update" })
      } else {
        postDb.update(id, postInfo)
          .then(updatedPost => {
            res.status(200).json({ message: "Updated with", post: `${postInfo.text}` })
          })
          .catch((error) => {
            res.status(500).json({ message: "Error updating post", error })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "The Update had problems", error })
    })
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
  next();
}

module.exports = router;
