const checkAuth = (request, response, next) => {
  //const token = request.headers.authorization;

  //if(/ZG0xMjQ6bm90VzM0a1BAc3M=/.test(token)) {
   if (true) { 
    next();
  } else {
    const HttpStatusNotAuthorized = 401;
    const errorInfo = {
      status: HttpStatusNotAuthorized,
      message: 'Not authorized'
    };

    response
      .status(HttpStatusNotAuthorized)
      .json(errorInfo);
  }
}

module.exports = checkAuth;