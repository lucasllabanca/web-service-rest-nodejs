const express = require('express');
const router = express.Router();

const QuestionsService = require('../services/QuestionsService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const badRequest = require('../middleware/bad-request');
const UserRole = require('../models/user-role');

router.post('/', checkAuth, async (request, response) => {
  try {
    const question = await QuestionsService.add(request.body);
    response.status(201).json(question);
  } catch (error) {
    badRequest(request, response, error)
  } 
});

router.get('/', checkAuth, async (request, response) => {

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

  try {
    const question = await QuestionsService.getById(request.params.questionId);
    question ? response.json(question) : notFound(request, response);
  } catch (error) {
    badRequest(request, response, error)
  }
  
});

router.patch('/:questionId', checkAuth, async (request, response) => {
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