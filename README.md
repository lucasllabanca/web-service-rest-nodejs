## DM124 Project

This project aims to provide a REST API Server for maintaining Questions, Answers and Users.

It makes use of the Sequelize ORM with Microsoft SQL Server database, together with Express.js and many other dependencies.

## Installation

Install the dependencies and start the server

```sh
npm install
npm start
```

## REST API documentation

Create/Update the Swagger (json) and [Markdown (md)](rest-server/doc/swagger_output.md) documentations inside ./rest-server/doc

```sh
npm run doc
```

## Database

To use this project with the designed database Microsoft SQL Server, have a look at the following SQL scripts

[Create DB](rest-server/sqlserver-scripts/create-database.sql)

[Create DB User](rest-server/sqlserver-scripts/create-user.sql)

Database configs

- Database: trabalho-dm124-db
- User: admin
- Pass: admin
- Host: localhost
- Port: 1433

## Try it out

All endpoints are protected with Basic Auth, except api/users/signup.

Use the signup endpoint to register a user with role ADMIN for full access to all endpoints or with role USER for limited access

```sh
curl -X 'POST'
  'http://localhost:8080/api/users/signup'
  -H 'accept: application/json'
  -H 'Content-Type: application/json'
  -d '{
  "name": "admin01",
  "password": "123456",
  "role": "ADMIN"
}'
```

With the server running, you can try it out using Swagger with your prefered browser, navigating to

```sh
http://localhost:8080/api
```

or you can use Postman with this [collection](rest-server/postman-collection/Requests.postman_collection.json).

2021 - Lucas Labanca