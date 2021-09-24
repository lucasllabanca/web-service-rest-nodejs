## DM124 Project - Private Repo

This project aims to provide a REST API Server for maintaining Questions, Answers and Users.

It makes use of the ORM Sequelize with Microsoft SQL Server database, together with Express.js and many other dependencies.

## Installation

Install the dependencies and start the server

```sh
npm install
npm start
```

## REST API documentation

Create the Swagger Web views and Markdown (md) documentation

```sh
npm run doc
```

[REST API Documentation](rest-server/doc/swagger_output.md)

## Database

To use this project with the designed database Microsoft SQL Server, have a look in the SQL scripts added to this source repo

[Create DB](rest-server/sqlserver-scripts/create-database.sql)
[Create DB User](rest-server/doc/create-user.sql)

Database configs:

- Database: trabalho-dm124-db
- User: admin
- Pass: admin
- Host: localhost
- Port: 1433

## Try it out

With the server running, you can try it out using Swagger with your prefered browser navigating to:

```sh
localhost:8080/api
```

or you can use Postman using the following json collection:

[Postman Colletion](rest-server/postman-collection/Requests.postman_collection.json)

2021 - Lucas Labanca