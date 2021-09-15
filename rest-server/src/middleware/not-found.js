const notFound = (request, response, next) => {
  const HttpStatusNotFound = 404;
  const errorInfo = {
    status: HttpStatusNotFound,
    message: `Route to ${request.method} ${request.path}`
  };

  response
    .status(HttpStatusNotFound)
    .json(errorInfo);

  next && next();
}

module.exports = notFound;