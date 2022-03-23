const User = require('../models/User');

module.exports = async function (currentUser, targetedUser) {
  if (currentUser !== targetedUser) {
    try {
      const user = await User.findById(currentUser, { role: 1, _id: 0 });
      if (user.role !== 'admin') {
        return 401;
      }
    } catch (err) {
      console.error(err.message);
      return 500;
    }
  }
  return 0;
};
