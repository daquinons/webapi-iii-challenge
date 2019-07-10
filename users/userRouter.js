const express = require('express');

const router = express.Router();

const Users = require('./userDb');

router.post('/', (req, res) => {

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

};

function validatePost(req, res, next) {

};

module.exports = router;
