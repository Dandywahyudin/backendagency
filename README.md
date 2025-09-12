# Backend Agency Express.js Application

Aplikasi Express.js yang terstruktur dengan baik untuk Backend Agency, mengikuti best practices dan pola arsitektur MVC.

## 🚀 Features

- ✅ Struktur folder yang terorganisir (MVC Pattern)
- ✅ Environment configuration dengan dotenv
- ✅ Error handling yang comprehensive
- ✅ Logging middleware
- ✅ Response helpers
- ✅ Validation utilities
- ✅ CORS support
- ✅ Graceful shutdown

## 📁 Project Structure

```
backendagency/
├── src/
│   ├── config/          # Konfigurasi aplikasi
│   ├── controllers/     # Business logic
│   ├── middleware/      # Custom middleware
│   ├── models/          # Data models (untuk database)
│   ├── services/        # Business services
│   └── utils/           # Utility functions
├── routes/              # Express routes
├── views/               # Template views (Jade)
├── public/              # Static assets
├── bin/                 # Server bootstrap
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── app.js              # Express app configuration
├── server.js           # Server startup
└── package.json        # Dependencies dan scripts
```

## 🛠️ Installation & Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd backendagency
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file sesuai kebutuhan
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## 📝 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server dengan nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 🌐 API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🔧 Configuration

### Environment Variables (.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=27017
DB_NAME=backendagency

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Config Structure (src/config/index.js)

Semua konfigurasi terpusat di file ini untuk memudahkan maintenance.

## 🏗️ Architecture

### Controllers
Controllers menangani business logic dan memisahkan logic dari routes.

### Middleware
- **Logger**: Logging requests (Morgan)
- **Error Handler**: Global error handling
- **Custom middleware**: Dapat ditambahkan sesuai kebutuhan

### Utils
- **Response Helper**: Standardized API responses
- **Validation**: Input validation utilities

## 🚦 Usage Examples

### Creating a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Getting All Users
```bash
curl http://localhost:3000/users
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication & Authorization (JWT)
- [ ] Rate limiting
- [ ] API documentation (Swagger)
- [ ] Unit tests
- [ ] Docker support
- [ ] CI/CD pipeline