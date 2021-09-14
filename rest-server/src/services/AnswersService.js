const Answer = require('../models/answer');

class AnswersService {

  static add(newAnswer) {
    return new Promise((resolve) => {
      resolve(Answer.create({
        key: newAnswer.key,
        name: newAnswer.name,
        answer: newAnswer.answer,
        questionId: newAnswer.questionId
      }));
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Answer.findAll());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Answer.findByPk(id));
    });
  }

  static update(answerId, updatedAnswer) {
    return new Promise((resolve) => {
      Answer.findByPk(answerId)
        .then(answer => {
          answer.key = updatedAnswer.key || answer.key;
          answer.name = updatedAnswer.name || answer.name;
          answer.answer = updatedAnswer.answer || answer.answer;
          answer.questionId = updatedAnswer.questionId || answer.questionId;
          resolve(answer.save());
        }).catch(resolve(null));
    });
  }

  static delete(answerId) {
    return new Promise((resolve) => {
      resolve(Answer.findByPk(answerId)
        .then(answer => {
          return answer.destroy();
        }));
    });
  }

}

module.exports = AnswersService;