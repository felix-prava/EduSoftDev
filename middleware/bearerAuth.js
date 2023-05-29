const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the headers
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const privateRouteKey =
    process.env.privateRouteKey || config.get('privateRouteKey');
  if (token !== `Bearer ${privateRouteKey}`) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
  next();
};
