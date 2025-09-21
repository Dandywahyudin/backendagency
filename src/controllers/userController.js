const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register };
