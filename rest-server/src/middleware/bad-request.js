const badRequest = (request, response, msg, next) => {
    const HttpStatusBadRequest = 400;
    const errorInfo = {
      status: HttpStatusBadRequest,
      message: `Route to ${request.method} ${request.path}: ${msg}`
    };
  
    response
      .status(HttpStatusBadRequest)
      .json(errorInfo);
  
    next && next();
  }
  
  module.exports = badRequest;