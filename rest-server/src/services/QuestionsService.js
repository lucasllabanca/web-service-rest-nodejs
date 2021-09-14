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

  // static update(questionId, updatedQuestion) {
  //   return new Promise((resolve) => {
  //     Question.findByPk(questionId)
  //       .then(question => {
  //         question.status = updatedQuestion.status || question.status;
  //         question.description = updatedQuestion.description || question.description;
  //         resolve(question.save());
  //       }).catch(resolve(null));
  //   });
  // }

  static update(questionId, updatedQuestion) {
    return new Promise((resolve) => {
                 
      if (updatedQuestion.id && updatedQuestion.id != questionId){
        updatedQuestion.message = "Request path id is different from request body id";
        resolve(updatedQuestion);
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
          resolve(err)
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