const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
      version: '1.0.0',
      title: 'DM124 REST API',        
      description: 'Trabalho Prático da disciplina DM124 - Lucas Leon Labanca',
    },
    host: 'localhost:8080',
    basePath: '/api', 
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: '',
        description: '',
      },
    ],
    securityDefinitions: {},  
    definitions: {
        Answer: {
            id: 1,
            key: 1,
            name: "Days of week answer",
            answer: "Answer to Question 2",
            createdAt: "2021-09-22T03:42:40.384Z",
            updatedAt: "2021-09-22T03:43:36.138Z",
            questionId: 1,
            question: {
                id: 1,
                status: "New",
                description: "Question 1",
                createdAt: "2021-09-22T03:39:44.484Z",
                updatedAt: "2021-09-22T03:39:44.484Z"
            }
        },
        AnswerAdded: {
            id: 1,
            key: 1,
            name: "Days of week answer",
            answer: "Answer to Question 1",
            questionId: 1,
            updatedAt: "2021-09-23T03:33:23.630Z",
            createdAt: "2021-09-23T03:33:23.630Z" 
        },
        AddAnswer: {
            key: 1,
            name: "Days of week answer",
            answer : "Answer to Question 1",
            questionId: 1
        }

    },     
  };

const outputFile = './doc/swagger_output.json'
const endpointsFiles = ['./src/routes/questions.js', './src/routes/answers.js', './src/routes/users.js']

swaggerAutogen(outputFile, endpointsFiles, doc)