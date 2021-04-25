const express = require('express');
require('dotenv').config();
const corsMiddleware = require('./middlewares/cors')
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const { login, creatUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { objValidateAuth } = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-err');


const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(corsMiddleware);
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

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log('Сервер работает');
});
