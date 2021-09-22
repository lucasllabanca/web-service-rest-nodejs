const User = require('../models/user');
const bcrypt = require('bcrypt');
const badRequest = require('../middleware/bad-request');

const checkAuth =  (request, response, next) => {

  if (!request.headers.authorization) {
    notAuthorized(response); //Rejeita o login
  } else {

    const token = request.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    const [name, password] = credentials.split(':');
  
    User.findOne({ where: { name: name } })
    .then(user => {
  
      if (!user) {
        badRequest(request, response, `User with name ${name} not found. Authentication failed`)
        //notAuthorized(response);
      } else {
  
        bcrypt.compare(password, user.password)
        .then(doMatch => {
  
          if (doMatch) {
            request.headers.role = user.role; //attaching role to use inside users router
            request.headers.id = user.id; //attaching id to use inside users router
            next() // Login com sucesso
          }else {
            notAuthorized(response); //Rejeita o login
          }
         
        }).catch(err => {
          notAuthorized(response); //Rejeita o login
        });
  
      }  
    }) 
    .catch(err => {
      notAuthorized(response);
    });

  }
}

const notAuthorized = (response) => {
  const HttpStatusNotAuthorized = 401;
  const errorInfo = {
    status: HttpStatusNotAuthorized,
    message: 'Not authorized'
  };

  response
    .status(HttpStatusNotAuthorized)
    .json(errorInfo);
}

module.exports = checkAuth;