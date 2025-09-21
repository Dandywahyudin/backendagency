const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const destroyToken = (token) => {
    console.log(`Token destroyed: ${token}`);
};

module.exports = { destroyToken };