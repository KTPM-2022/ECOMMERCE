const User = require('../models/User');

async function getUserService(id) {
  const user = await User.findById(id).select('_id name email');
  if (user) {
    return user;
  } else return null;
}

module.exports = { getUserService };
