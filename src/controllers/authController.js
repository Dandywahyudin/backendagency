const { token } = require('morgan');
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.json({
            message: 'Login successful',
            token: result.token,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                role: result.user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(401).json({ error: error.message });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const result = await userService.logoutUser(token);
    } catch (error) {
        console.error('Logout error:', error.message);
        return res.status(400).json({ error: error.message });
    }
    res.json({ message: 'Logout successful' });
}

console.log('login export =', login); //debug
module.exports = { register, login, logout };
