const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const corsMiddleware = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const { login, creatUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErros = require('./middlewares/errors');
const auth = require('./middlewares/auth');
const { objValidateAuth } = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(limiter);
app.use(corsMiddleware);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate(objValidateAuth), login);
app.post('/signup', celebrate(objValidateAuth), creatUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(handleErros);

app.listen(PORT, () => {
  console.log('Сервер работает');
});
