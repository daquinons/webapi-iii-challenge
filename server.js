const express = require('express');

const server = express();
server.use(express.json());

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

//custom middleware

function logger(req, res, next) {
  console.log('logger:', req.method, req.originalUrl, Date.now());
  next();
}

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter.router);

module.exports = server;
