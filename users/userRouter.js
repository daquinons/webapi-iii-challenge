const express = require('express');

const router = express.Router();

const Users = require('./userDb');

router.post('/', validateUser, async (req, res) => {
  const user = req.body;
  const createdUser = await Users.insert(user);

  res.json(createdUser);
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.json(users);  
  } catch (error) {
    res.status(500).json({ message: 'There was a problem retrieving the users' });
  }
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {
  const user = req.body;

  if (!user) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
};

function validatePost(req, res, next) {

};

module.exports = router;
