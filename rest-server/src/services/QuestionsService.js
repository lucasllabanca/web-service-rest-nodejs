const Question = require('../models/question');

class QuestionsService {

  static add(newQuestion) {
    return new Promise((resolve) => {
      newQuestion.status = newQuestion.status || 'New';
      resolve(Question.create({
        status: newQuestion.status,
        description: newQuestion.description
      }).then(question => {
        if (newQuestion.options) {
          newQuestion.options.forEach(option => {
            question.createOption({
              option: option
            });
          });
        }
      }));
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Question.findAll());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Question.findByPk(id));
    });
  }

  static update(questionId, updatedQuestion) {
    return new Promise((resolve) => {
      Question.findByPk(questionId)
        .then(question => {
          question.status = updatedQuestion.status || question.status;
          question.description = updatedQuestion.description || question.description;
          resolve(question.save());
        }).catch(resolve(null));
    });
  }

  static delete(questionId) {
    return new Promise((resolve) => {
      resolve(Question.findByPk(questionId)
        .then(question => {
          return question.destroy();
        }));
    });
  }

}

module.exports = QuestionsService;