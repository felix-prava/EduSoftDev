const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the headers
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  if (token !== `Bearer ${config.get('privateRouteKey')}`) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
  next();
};
