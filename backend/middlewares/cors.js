const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3001', 'http://mesto.anton-sarkisyan.nomoredomains.club', 'https://mesto.anton-sarkisyan.nomoredomains.club'],
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = cors(corsOptions);
