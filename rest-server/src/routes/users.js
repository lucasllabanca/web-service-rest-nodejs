const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UsersService = require('../services/UserService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const badRequest = require('../middleware/bad-request');
const UserRole = require('../models/user-role');

router.post('/signup', async (request, response) => {

  /*
    #swagger.tags = ['Users']
    #swagger.description = 'Add a user'
    #swagger.path = '/users/signup'
    #swagger.method = 'post'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']

    #swagger.parameters['User'] = {
        in: 'body',
        description: 'User',
        required: true,
        schema: { $ref: "#/definitions/UserToAdd" }
    }
   
    #swagger.responses[201] = { 
      schema: { $ref: "#/definitions/User" },
      description: 'User added succesfully' 
    }

    #swagger.responses[400] = {  description: 'Bad Request' }
  */

  try {
    let password = request.body.password;
    let encrypted = await bcrypt.hash(password, 12);
    request.body.password = encrypted;
    const user = await UsersService.add(request.body);
    user.password = '******';
    response.status(201).json(user);
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.get('/', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]
    
    #swagger.tags = ['Users']
    #swagger.description = 'Get a list of all of the users'
    #swagger.path = '/users'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']

    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/UserList" },
      description: 'User list found' 
    }

    #swagger.responses[204] = {  description: 'No Content' }
    #swagger.responses[400] = {  description: 'Bad Request: error or not allowed to users with role: USER' }
  */

  try {
    if (UserRole.Admin == request.headers.role) {
      const users = await UsersService.getAll();
      users && users.length ? response.json(users) : response.status(204).end();
    } else {
      badRequest(request, response, 'This request is not allowed to users with role: USER')
    }   
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.get('/:userId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Users']
    #swagger.description = 'Get a user by ID'
    #swagger.path = '/users/{userId}'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']

    #swagger.parameters['userId'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'integer'
    }

    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/User" },
      description: 'User found' 
    }

    #swagger.responses[400] = {  description: 'Bad Request: error or user with role USER is not authorized to get someone elses user' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {

    const user = await UsersService.getById(request.params.userId);

    if (user) {

      if (UserRole.Admin == request.headers.role) {
        response.json(user);
      } else {
        
        if (user.id != request.headers.id) 
          badRequest(request, response, `User with role USER is not authorized to get someone else's user`)
        else
          response.json(user);

      }
      
    } else {
      notFound(request, response);
    }
  
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.patch('/:userId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Users']
    #swagger.description = 'Update a user'
    #swagger.path = '/users/{userId}'
    #swagger.method = 'patch'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']

    #swagger.parameters['userId'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'integer'
    }

    #swagger.parameters['User'] = {
        in: 'body',
        description: 'User',
        required: true,
        schema: { $ref: "#/definitions/UserToAdd" }
    }
   
    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/User" },
      description: 'User updated succesfully' 
    }

    #swagger.responses[400] = {  description: 'Bad Request: error or user with role USER is not authorized to update someone elses user' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {

    let password = request.body.password;
    let encrypted = await bcrypt.hash(password, 12);
    request.body.password = encrypted;

    if (UserRole.User == request.headers.role && request.headers.id != request.params.userId) {
      badRequest(request, response, `User with role USER is not authorized to update someone else's user`)
    } else {

      const updatedUser = await UsersService.update(request.params.userId, request.body);

      if (!updatedUser)
        notFound(request, response)
      else {
        updatedUser.password = '******';
        response.json(updatedUser);
      } 

    }
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.delete('/:userId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Users']
    #swagger.description = 'Delete a user by ID'
    #swagger.path = '/users/{userId}'
    #swagger.method = 'delete'

    #swagger.parameters['userId'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'integer'
    }

    #swagger.responses[200] = {  description: 'User deleted' }
    #swagger.responses[400] = {  description: 'Bad Request: error or user with role USER is not authorized to delete someone elses user' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {

    if (UserRole.User == request.headers.role && request.headers.id != request.params.userId) {
      badRequest(request, response, `User with role USER is not authorized to delete someone else's user`)
    } else {
      const isDeleted = await UsersService.delete(request.params.userId);
      isDeleted ? response.end() : notFound(request, response)
    }
  
  } catch (error) {
    badRequest(request, response, error)
  }

});

module.exports = router;