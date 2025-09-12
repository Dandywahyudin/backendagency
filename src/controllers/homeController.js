const homeController = {
  // GET /
  getHome: (req, res) => {
    res.render('index', { 
      title: 'Backend Agency',
      message: 'Welcome to Backend Agency Express App'
    });
  },

  // GET /api/health
  getHealthCheck: (req, res) => {
    res.json({
      status: 'OK',
      message: 'Server is running properly',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }
};

module.exports = homeController;
