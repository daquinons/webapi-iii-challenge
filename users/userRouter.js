const express = require('express');

const router = express.Router();

const Users = require('./userDb');

router.post('/', validateUser, async (req, res) => {
  const user = req.body;
  const createdUser = await Users.insert(user);

  res.status(201).json(createdUser);
});

router.post('/:id/posts', (req, res) => {});

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem retrieving the users' });
  }
});

router.get('/:id', validateUserId, (req, res) => {
  const user = req.user;
  res.json(user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const user = req.user;
    const posts = await Users.getUserPosts(user.id);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'There was a problem getting the user posts' });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const user = req.user;
    const userRemoved = await Users.remove(user.id);
    res.json({ ...user, removed: userRemoved ? true : false });
  } catch (error) {
    res.status(500).json({ message: 'There was a problem deleting the user' });
  }
});

router.put('/:id', [validateUser, validateUserId], async (req, res) => {
  try {
    const userToUpdate = req.user;
    const newUserInfo = req.body;
    await Users.update(userToUpdate.id, newUserInfo);
    const updatedUser = await Users.getById(userToUpdate.id);
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'There was a problem updating the user info' });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await Users.getById(id);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: 'invalid user id' });
  }
}

function validateUser(req, res, next) {
  const user = req.body;

  if (!user) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!user.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const post = req.body;
  if (!post) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
