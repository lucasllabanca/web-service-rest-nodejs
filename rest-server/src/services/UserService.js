const User = require('../models/user');

class UsersService {

  static add(newUser) {

    return new Promise((resolve, reject) => {

        User.findOne({ where: { name: newUser.name } })      
          .then(user => {
            if (user) {
              reject(`User with name ${user.name} already exists`);
            } else {             
              resolve(User.create({
                name: newUser.name,
                password: newUser.password,
                role: newUser.role
              }));
            }                   
          }).catch((err) => {
            reject(err)
          });
      });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(User.findAll());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(User.findByPk(id));
    });
  }

  static update(userId, updatedUser) {
    return new Promise((resolve, reject) => {
                 
      if (updatedUser.id && updatedUser.id != userId){
        reject("Request path id is different from request body id");
      } else {
        User.findByPk(userId)      
        .then(user => {
          if (!user) {
            resolve(null);
          } else {
            let encrypted = bcrypt.hash(newUser.password, 12);  
            user.name = updatedUser.name || user.name;
            user.password = encrypted || user.password;
            user.role = updatedUser.role || user.role;           
            resolve(user.save());
          }                   
        }).catch((err) => {
          reject(err)
        });
      }
    });
  }

  static delete(userId) {
    return new Promise((resolve) => {
      resolve(User.findByPk(userId)
        .then(user => {
          return user.destroy();
        }));
    });
  }

}

module.exports = UsersService;