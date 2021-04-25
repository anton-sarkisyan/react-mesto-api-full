const cors = require('cors');

const whiteList = [
  'http://mesto.anton-sarkisyan.nomoredomains.club',
  'https://mesto.anton-sarkisyan.nomoredomains.club'
]

const corsOptions = {
  origin(origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

module.exports = cors(corsOptions);
