const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');

//custom middleware

function logger(req, res, next) {
  console.log('logger:', req.method, req.originalUrl, Date.now());
  next();
};

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/api/users', userRouter);

module.exports = server;
