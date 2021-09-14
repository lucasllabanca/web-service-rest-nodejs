const express = require('express');
const app = express();

// Middlewares
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const notFound = require('./middleware/not-found');
const badRequest = require('./middleware/bad-request');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
app.use('/api/questions', questionsRouter);
app.use('/api/answers', answersRouter);

// Middlewares
app.use(notFound);
app.use(badRequest);

module.exports = app;