const express = require('express');
const router = express.Router();

const AnswersService = require('../services/AnswersService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const badRequest = require('../middleware/bad-request');
const UserRole = require('../models/user-role');

router.post('/', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Answers']
    #swagger.description = 'Add an answer'
    #swagger.path = '/answers'
    #swagger.method = 'post'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']

    #swagger.parameters['Answer'] = {
        in: 'body',
        description: 'Answer',
        required: true,
        schema: { $ref: "#/definitions/AnswerToAdd" }
    }
   
    #swagger.responses[201] = { 
      schema: { $ref: "#/definitions/AnswerAdded" },
      description: 'Answer added succesfully' 
    }

    #swagger.responses[400] = {  description: 'Bad Request' }
  */

  try {
    const answer = await AnswersService.add(request.body);
    response.status(201).json(answer);
  } catch (error) {
    badRequest(request, response, error)
  } 
});

router.get('/', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Answers']
    #swagger.description = 'Get a list of all of the answers'
    #swagger.path = '/answers'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']

    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/AnswerList" },
      description: 'Answer list found' 
    }

    #swagger.responses[204] = {  description: 'No Content' }
    #swagger.responses[400] = {  description: 'Bad Request' }
  */

  try {
    if (UserRole.Admin == request.headers.role) {
      const answers = await AnswersService.getAll();
      answers && answers.length ? response.json(answers) : response.status(204).end();
    } else {
      badRequest(request, response, 'This request is not allowed to users with role: USER')
    }   
  } catch (error) {
    badRequest(request, response, error)
  }
 
});

router.get('/:answerId', checkAuth, async (request, response) => {
  
  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Answers']
    #swagger.description = 'Get an answer by ID'
    #swagger.path = '/answers/{answerId}'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']

    #swagger.parameters['answerId'] = {
        in: 'path',
        description: 'Answer ID',
        required: true,
        type: 'integer'
    }

    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/Answer" },
      description: 'Answer found' 
    }

    #swagger.responses[400] = {  description: 'Bad Request' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {
    const answer = await AnswersService.getById(request.params.answerId);
    answer ? response.json(answer) : notFound(request, response);
  } catch (error) {
    badRequest(request, response, error)
  }

});

router.patch('/:answerId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Answers']
    #swagger.description = 'Update an answer'
    #swagger.path = '/answers/{answerId}'
    #swagger.method = 'patch'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']

    #swagger.parameters['answerId'] = {
        in: 'path',
        description: 'Answer ID',
        required: true,
        type: 'integer'
    }

    #swagger.parameters['Answer'] = {
        in: 'body',
        description: 'Answer',
        required: true,
        schema: { $ref: "#/definitions/AnswerToAdd" }
    }
   
    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/AnswerAdded" },
      description: 'Answer updated succesfully' 
    }

    #swagger.responses[400] = {  description: 'Bad Request' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {
    const updatedAnswer = await AnswersService.update(
      request.params.answerId,
      request.body
    );
    if (!updatedAnswer)
      notFound(request, response)
    else
      response.json(updatedAnswer);
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.delete('/:answerId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]
    
    #swagger.tags = ['Answers']
    #swagger.description = 'Delete an answer by ID'
    #swagger.path = '/answers/{answerId}'
    #swagger.method = 'delete'

    #swagger.parameters['answerId'] = {
        in: 'path',
        description: 'Answer ID',
        required: true,
        type: 'integer'
    }

    #swagger.responses[200] = {  description: 'Answer deleted' }
    #swagger.responses[400] = {  description: 'Bad Request' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {
    if (UserRole.Admin == request.headers.role) {
      const isDeleted = await AnswersService.delete(request.params.answerId);
      isDeleted ? response.end() : notFound(request, response)
    } else {
      badRequest(request, response, 'This request is not allowed to users with role: USER')
    }   
  } catch (error) {
    badRequest(request, response, error)
  }
 
});

module.exports = router;