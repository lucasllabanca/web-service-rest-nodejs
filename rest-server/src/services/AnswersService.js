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
                 
      if (updatedAnswer.id && updatedAnswer.id != answerId){
        updatedAnswer.message = "Request path id is different from request body id";
        resolve(updatedAnswer);
      } else {
        Answer.findByPk(answerId)      
        .then(answer => {
          if (!answer) {
            resolve(null);
          } else {
            answer.key = updatedAnswer.key || answer.key;
            answer.name = updatedAnswer.name || answer.name;
            answer.answer = updatedAnswer.answer || answer.answer;
            answer.questionId = updatedAnswer.questionId || answer.questionId;
            resolve(answer.save());
          }                   
        }).catch((err) => {
          resolve(err)
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