const express = require('express');
const router = express.Router();

const QuestionsService = require('../services/QuestionsService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const badRequest = require('../middleware/bad-request');
const UserRole = require('../models/user-role');

router.post('/', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]
    
    #swagger.tags = ['Questions']
    #swagger.description = 'Add a question'
    #swagger.path = '/questions'
    #swagger.method = 'post'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']

    #swagger.parameters['Question'] = {
        in: 'body',
        description: 'Question',
        required: true,
        schema: { $ref: "#/definitions/QuestionToAdd" }
    }
   
    #swagger.responses[201] = { 
      schema: { $ref: "#/definitions/QuestionAdded" },
      description: 'Question added succesfully' 
    }

    #swagger.responses[400] = {  description: 'Bad Request' }
  */

  try {
    const question = await QuestionsService.add(request.body);
    response.status(201).json(question);
  } catch (error) {
    badRequest(request, response, error)
  } 
});

router.get('/', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Questions']
    #swagger.description = 'Get a list of all of the questions'
    #swagger.path = '/questions'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']

    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/QuestionList" },
      description: 'Question list found' 
    }

    #swagger.responses[204] = {  description: 'No Content' }
    #swagger.responses[400] = {  description: 'Bad Request' }
  */

  try {
    if (UserRole.Admin == request.headers.role) {
      const questions = await QuestionsService.getAll();
      questions && questions.length ? response.json(questions) : response.status(204).end();
    } else {
      badRequest(request, response, 'This request is not allowed to users with role: USER')
    }   
  } catch (error) {
    badRequest(request, response, error)
  }
  
});

router.get('/:questionId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Questions']
    #swagger.description = 'Get a question by ID'
    #swagger.path = '/questions/{questionId}'
    #swagger.method = 'get'
    #swagger.produces = ['application/json']

    #swagger.parameters['questionId'] = {
        in: 'path',
        description: 'Question ID',
        required: true,
        type: 'integer'
    }

    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/Question" },
      description: 'Question found' 
    }

    #swagger.responses[400] = {  description: 'Bad Request' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {
    const question = await QuestionsService.getById(request.params.questionId);
    question ? response.json(question) : notFound(request, response);
  } catch (error) {
    badRequest(request, response, error)
  }
  
});

router.patch('/:questionId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]
    
    #swagger.tags = ['Questions']
    #swagger.description = 'Update a question'
    #swagger.path = '/questions/{questionId}'
    #swagger.method = 'patch'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']

    #swagger.parameters['questionId'] = {
        in: 'path',
        description: 'Question ID',
        required: true,
        type: 'integer'
    }

    #swagger.parameters['Question'] = {
        in: 'body',
        description: 'Question',
        required: true,
        schema: { $ref: "#/definitions/QuestionToAdd" }
    }
   
    #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/QuestionAdded" },
      description: 'Question updated succesfully' 
    }

    #swagger.responses[400] = {  description: 'Bad Request' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {
    const updatedQuestion = await QuestionsService.update(
      request.params.questionId,
      request.body
    );
    if (!updatedQuestion)
      notFound(request, response)
    else  
      response.json(updatedQuestion);
  } catch (error) {
    badRequest(request, response, error)
  }
});

router.delete('/:questionId', checkAuth, async (request, response) => {

  /*
    #swagger.security = [{
      "basicAuth": []
    }]

    #swagger.tags = ['Questions']
    #swagger.description = 'Delete a question by ID'
    #swagger.path = '/questions/{questionId}'
    #swagger.method = 'delete'

    #swagger.parameters['questionId'] = {
        in: 'path',
        description: 'Question ID',
        required: true,
        type: 'integer'
    }

    #swagger.responses[200] = {  description: 'Question deleted' }
    #swagger.responses[400] = {  description: 'Bad Request' }
    #swagger.responses[404] = {  description: 'Not Found' }
  */

  try {
    if (UserRole.Admin == request.headers.role) {
      const isDeleted = await QuestionsService.delete(request.params.questionId);
      isDeleted ? response.end() : notFound(request, response)
    } else {
      badRequest(request, response, 'This request is not allowed to users with role: USER')
    }   
  } catch (error) {
    badRequest(request, response, error)
  }

});

module.exports = router;