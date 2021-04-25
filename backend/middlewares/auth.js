const jwt = require('jsonwebtoken');
const NoRightsErr = require('../errors/no-rights-err');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    next(new NoRightsErr('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
