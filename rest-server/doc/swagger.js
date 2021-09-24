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
    securityDefinitions: {
      basicAuth: {
        type: 'basic',
        in: 'header',
        name: 'Authorization',
        description: 'Basic Auth Base 64'
      },
    },  
    definitions: {
        Question: {
            id: 1,
            status: "New",
            description: "Question 1",
            createdAt: "2021-09-24T00:52:02.775Z",
            updatedAt: "2021-09-24T00:52:02.775Z",
            answer: {
                id: 1,
                key: 1,
                name: "Days of week answer",
                answer: "Answer to Question 1",
                createdAt: "2021-09-24T00:53:58.517Z",
                updatedAt: "2021-09-24T00:53:58.517Z",
                questionId: 1
            },
            options: [
              {
                  id: 1,
                  option: "Option-1",
                  questionId: 1
              },
              {
                  id: 2,
                  option: "Option-2",
                  questionId: 1
              },
              {
                  id: 3,
                  option: "Option-3",
                  questionId: 1
              }
          ]
        },
        QuestionList: [{
          id: 1,
          status: "New",
          description: "Question 1",
          createdAt: "2021-09-24T00:52:02.775Z",
          updatedAt: "2021-09-24T00:52:02.775Z",
          answer: {
              id: 1,
              key: 1,
              name: "Days of week answer",
              answer: "Answer to Question 1",
              createdAt: "2021-09-24T00:53:58.517Z",
              updatedAt: "2021-09-24T00:53:58.517Z",
              questionId: 1
          },
          options: [
            {
                id: 1,
                option: "Option-1",
                questionId: 1
            },
            {
                id: 2,
                option: "Option-2",
                questionId: 1
            },
            {
                id: 3,
                option: "Option-3",
                questionId: 1
            }
          ]
        }],
        QuestionToAdd: {
            description: "Question 1",
            status: "New",
            options : ["Option-1", "Option-2", "Option-3"]
        },
        QuestionAdded: {
            id: 1,
            status: "New",
            description: "Question 1",
            updatedAt: "2021-09-24T00:52:02.775Z",
            createdAt: "2021-09-24T00:52:02.775Z"
        },
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
          AnswerList: [{
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
        }],
        AnswerToAdd: {
          key: 1,
          name: "Days of week answer",
          answer : "Answer to Question 1",
          questionId: 1
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
        User: {
          id: 1,
          name: "admin01",
          role: "ADMIN",
          updatedAt: "2021-09-24T00:45:54.199Z",
          createdAt: "2021-09-24T00:45:54.199Z"
        },
        UserList: [
          {
              id: 1,
              name: "lucasllabanca01",
              role: "ADMIN",
              createdAt: "2021-09-24T00:45:54.199Z",
              updatedAt: "2021-09-24T00:45:54.199Z"
          },
          {
              id: 2,
              name: "user01",
              role: "USER",
              createdAt: "2021-09-24T00:48:14.123Z",
              updatedAt: "2021-09-24T00:48:14.123Z"
          }
        ],
        UserToAdd: {
          name: "admin01",
          password: "123456",
          role : "ADMIN"
        }      
    },     
  };

const outputFile = './doc/swagger_output.json'
const endpointsFiles = ['./src/routes/questions.js', './src/routes/answers.js', './src/routes/users.js']

swaggerAutogen(outputFile, endpointsFiles, doc)