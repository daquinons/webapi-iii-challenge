const express = require('express');

const router = express.Router();

const Posts = require('./postDb');

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'There was a problem retrieving the posts' });
  }
});

router.get('/:id', validatePostId, (req, res) => {
  const post = req.post;
  res.json(post);
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const post = req.post;
    const postRemoved = await Posts.remove(post.id);
    res.json({ ...post, removed: postRemoved ? true : false });
  } catch (error) {
    res.status(500).json({ message: 'There was a problem deleting the user' });
  }
});

router.put('/:id', [validatePost, validatePostId], async (req, res) => {
  try {
    const postToUpdate = req.post;
    const newPostInfo = req.body;
    await Posts.update(postToUpdate.id, newPostInfo);
    const updatedPost = await Posts.getById(postToUpdate.id);
    res.json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem updating the user info' });
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  const post = await Posts.getById(id);

  if (post) {
    req.post = post;
    next();
  } else {
    res.status(400).json({ message: 'invalid post id' });
  }
};

function validatePost(req, res, next) {
  const post = req.body;

  if (Object.keys(post).length === 0) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!post.text) {
    res.status(400).json({ message: 'missing required text field' });
  } else if (!post.user_id) {
    res.status(400).json({ message: 'missing required user_id field' });
  } else {
    next();
  }
}

module.exports = {router, validatePost};