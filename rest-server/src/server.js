const http = require('http');
const app = require('./app');
const sequelize = require('./database/trabalho-dm124-db');
const Question = require('./models/question');
const Option = require('./models/option');
const Answer = require('./models/answer');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

Option.belongsTo(Question, {constraints: true, onDelete: 'CASCADE'});
Question.hasMany(Option)
Answer.belongsTo(Question, {constraints: true, onDelete: 'CASCADE'});
Question.hasOne(Answer);
sequelize
  .sync()//{force : true}) //DROP TABLE + Creates IF NOT EXISTS
  .then(
    http.createServer(app)
      .listen(port, () => {
        console.log(`Server up on http://${host}:${port}`);
      })
  )
  .catch()