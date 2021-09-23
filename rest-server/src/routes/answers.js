const express = require('express');
const router = express.Router();

const AnswersService = require('../services/AnswersService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const badRequest = require('../middleware/bad-request');
const UserRole = require('../models/user-role');

router.post('/', checkAuth, async (request, response) => {
  try {
    const answer = await AnswersService.add(request.body);
    response.status(201).json(answer);
  } catch (error) {
    badRequest(request, response, error)
  } 
});

router.get('/', checkAuth, async (request, response) => {

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

  try {
    const answer = await AnswersService.getById(request.params.answerId);
    answer ? response.json(answer) : notFound(request, response);
  } catch (error) {
    badRequest(request, response, error)
  }

});

router.patch('/:answerId', checkAuth, async (request, response) => {
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