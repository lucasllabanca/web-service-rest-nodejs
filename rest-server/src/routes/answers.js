const express = require('express');
const router = express.Router();

const AnswersService = require('../services/AnswersService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

router.post('/', checkAuth, async (request, response) => {
  const answer = await AnswersService.add(request.body);
  response
    .status(201)
    .json(answer);
});

router.get('/', checkAuth, async (request, response) => {
  const answers = await AnswersService.getAll();
  answers && answers.length
    ? response.json(answers)
    : response.status(204).end();
});

router.get('/:answerId', async (request, response) => {
  const answer = await AnswersService.getById(request.params.answerId);
  answer
    ? response.json(answer)
    : notFound(request, response);
});

router.patch('/:answerId', async (request, response) => {
  const updatedAnswer = await AnswersService.update(
    request.params.answerId,
    request.body
  );
  updatedAnswer
    ? response.json(updatedAnswer)
    : notFound(request, response);
});

router.delete('/:answerId', async (request, response) => {
  const isDeleted = await AnswersService.delete(request.params.answerId);
  isDeleted
    ? response.end()
    : notFound(request, response)
});

module.exports = router;