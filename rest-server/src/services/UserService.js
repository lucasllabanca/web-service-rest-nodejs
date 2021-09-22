const User = require('../models/user');
const UserRole = require('../models/user-role');

class UsersService {

  static add(newUser) {

    return new Promise((resolve, reject) => {

        User.findOne({ where: { name: newUser.name } })      
          .then(user => {
            if (user) {
              reject(`User with name ${newUser.name} already exists`);
            } else {     
              
              if (Object.values(UserRole).includes(newUser.role)) {
                resolve(User.create({
                  name: newUser.name,
                  password: newUser.password,
                  role: newUser.role
                }));
              } else {
                reject(`User role ${newUser.role} is invalid. Valid roles: ADMIN | USER`);
              }                      
            }                   
          }).catch((err) => {
            reject(err)
          });
      });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(User.findAll({attributes: { exclude: ['password'] }}));
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(User.findByPk(id, {attributes: { exclude: ['password'] }}));
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
            
            if (updatedUser.role && !Object.values(UserRole).includes(updatedUser.role)) {
              reject(`User role ${updatedUser.role} is invalid. Valid roles: ADMIN | USER`);
            } else {

              if (updatedUser.name && updatedUser.name != user.name) {

                User.findOne({ where: { name: updatedUser.name } })      
                .then(user2 => {
                  if (user2 && user2.id != user.id) {
                    reject(`User with name ${updatedUser.name} already exists`);
                  } else {     
                    user.name = updatedUser.name || user.name;
                    user.password = updatedUser.password || user.password;
                    user.role = updatedUser.role || user.role;           
                    resolve(user.save());                              
                  }                   
                }).catch((err) => {
                  reject(err)
                });

              } else {

                user.name = updatedUser.name || user.name;
                user.password = updatedUser.password || user.password;
                user.role = updatedUser.role || user.role;           
                resolve(user.save());

              }
          
            }
       
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