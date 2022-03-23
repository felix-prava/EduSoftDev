module.exports = function checkRole(role = 'mentor') {
  return async (req, res, next) => {
    // TODO redirect to login page
    try {
      const user = await User.findById(req.user.id, { role: 1, _id: 0 });
      if (role == 'admin' && user.role !== 'admin') {
        return res.status(401).send('Unauthorized');
      }
      if (role == 'mentor' && user.role === 'normal') {
        return res.status(401).send('Unauthorized');
      }
      return next();
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
};
