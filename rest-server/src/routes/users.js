const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UsersService = require('../services/UserService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const badRequest = require('../middleware/bad-request');

router.post('/signup', checkAuth, async (request, response) => {
  try {
    let password = request.body.password;
    let encrypted = await bcrypt.hash(password, 12);
    request.body.password = encrypted;
    const user = await UsersService.add(request.body);
    response.status(201).json(user);
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.get('/', checkAuth, async (request, response) => {
  const users = await UsersService.getAll();
  users && users.length
    ? response.json(users)
    : response.status(204).end();
});

router.get('/:userId', checkAuth, async (request, response) => {
  const user = await UsersService.getById(request.params.userId);
  user
    ? response.json(user)
    : notFound(request, response);
});

router.patch('/:userId', checkAuth, async (request, response) => {
  try {
    const updatedUser = await UsersService.update(
      request.params.userId,
      request.body
    );
    if (!updatedUser)
      notFound(request, response)
    else  
      response.json(updatedUser);
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.delete('/:userId', checkAuth, async (request, response) => {
  const isDeleted = await UsersService.delete(request.params.userId);
  isDeleted
    ? response.end()
    : notFound(request, response)
});

module.exports = router;