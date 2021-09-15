const Answer = require('../models/answer');
const Question = require('../models/question');
const Option = require('../models/option');

class QuestionsService {

  static add(newQuestion) {
    return new Promise((resolve, reject) => {

      newQuestion.status = newQuestion.status || 'New';

      Question.create({
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
        resolve(question);
      }).catch((err) => {
        reject(err)
      });
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Question.findAll({include: [{model: Answer}, {model: Option}]}));
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Question.findByPk(id, {include: [{model: Answer}, {model: Option}]}));
    });
  }

  static update(questionId, updatedQuestion) {
    return new Promise((resolve, reject) => {
                 
      if (updatedQuestion.id && updatedQuestion.id != questionId) {
        reject("Request path id is different from request body id");
      } else {
        Question.findByPk(questionId)
        .then(question => {
          if (!question) {
            resolve(null);
          } else {
            question.status = updatedQuestion.status || question.status;
            question.description = updatedQuestion.description || question.description;
            resolve(question.save());
          }                   
        }).catch((err) => {
          reject(err)
        });
      }
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