const { getUserService } = require('../services/userService');

async function getUser(req, res) {
  const id = req.auth;
  const user = await getUserService(id);
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).send('User not found');
  }
}

module.exports = { getUser };
