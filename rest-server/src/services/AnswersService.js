const Answer = require('../models/answer');
const Question = require('../models/question')

class AnswersService {

  static add(newAnswer) {
    return new Promise((resolve, reject) => {

      Question.findByPk(newAnswer.questionId)      
        .then(question => {
          if (!question) {
            reject(`Question with id ${newAnswer.questionId} not found`);
          } else {
            resolve(Answer.create({
              key: newAnswer.key,
              name: newAnswer.name,
              answer: newAnswer.answer,
              questionId: newAnswer.questionId
            }));
          }                   
        }).catch((err) => {
          reject(err)
        });
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Answer.findAll({include: Question}));
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Answer.findByPk(id, {include: Question}));
    });
  }

  static update(answerId, updatedAnswer) {
    return new Promise((resolve, reject) => {
                 
      if (updatedAnswer.id && updatedAnswer.id != answerId) {
        reject("Request path id is different from request body id");
      } else {
        Answer.findByPk(answerId)      
        .then(answer => {
          if (!answer) {
            resolve(null);
          } else {
            answer.questionId = updatedAnswer.questionId || answer.questionId;
            Question.findByPk(answer.questionId)      
              .then(question => {
                if (!question) {
                  reject(`Question with id ${answer.questionId} not found`);
                } else {
                  answer.key = updatedAnswer.key || answer.key;
                  answer.name = updatedAnswer.name || answer.name;
                  answer.answer = updatedAnswer.answer || answer.answer;
                  answer.questionId = updatedAnswer.questionId || answer.questionId;
                  resolve(answer.save());
                }                   
              }).catch((err) => {
                reject(err)
              });
          }                   
        }).catch((err) => {
          reject(err)
        });
      }
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