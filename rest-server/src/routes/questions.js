const express = require('express');
const router = express.Router();

const QuestionsService = require('../services/QuestionsService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');
const badRequest = require('../middleware/bad-request');

router.post('/', checkAuth, async (request, response) => {
  try {
    const question = await QuestionsService.add(request.body);
    response.status(201).json(question);
  } catch (error) {
    badRequest(request, response, error)
  } 
});

router.get('/', checkAuth, async (request, response) => {
  const questions = await QuestionsService.getAll();
  questions && questions.length
    ? response.json(questions)
    : response.status(204).end();
});

router.get('/:questionId', checkAuth, async (request, response) => {
  const question = await QuestionsService.getById(request.params.questionId);
  question
    ? response.json(question)
    : notFound(request, response);
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
  const isDeleted = await QuestionsService.delete(request.params.questionId);
  isDeleted
    ? response.end()
    : notFound(request, response)
});

module.exports = router;