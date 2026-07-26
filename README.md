# 🚀 Quizler Backend

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express.js-4.x-black)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

A RESTful backend API for the **Quizler** application built with **Node.js**, **Express.js**, and **MySQL**. The application provides secure user authentication, quiz management, and user-related operations while following modular backend architecture and industry-standard development practices.

---

# 📖 Overview

Quizler Backend is designed to power an online quiz platform by providing secure APIs for authentication and quiz-related operations.

The project demonstrates practical backend development concepts including:

- RESTful API Design
- JWT Authentication
- Password Hashing using bcrypt
- MySQL Database Integration
- Environment Variable Configuration
- Express Middleware
- Secure HTTP Headers with Helmet
- CORS Configuration
- Modular Project Structure

This project was built to strengthen backend development skills and follows clean coding practices suitable for production-ready applications.

---

# ✨ Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- MySQL Database Integration
- Modular Route Structure
- Environment-based Configuration
- Helmet Security Middleware
- CORS Support
- Error Logging
- Request Logging

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Authentication

- JSON Web Token (JWT)
- bcrypt

## Security

- Helmet
- CORS

## Logging

- Morgan

## Configuration

- dotenv

---

# 📁 Project Structure

```text
quizler-backend
│
├── config/
├── controllers/
├── database/
├── middleware/
├── routes/
├── logs/
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Getting Started

## Clone Repository

```bash
git clone https://github.com/GaurangVishnoi17/quizler-backend.git

cd quizler-backend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quizler

JWT_SECRET=your_secret_key
JWT_EXPIRY=1h
```

---

# ▶️ Run the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🗄 Database

Create a MySQL database.

Import the SQL schema included in the project.

Update the database credentials inside the `.env` file.

---

# 🔐 Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

Workflow:

1. Register a new user.
2. Login with valid credentials.
3. Receive a JWT token.
4. Send the token in the Authorization header.

Example

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /register | Register a new user |
| POST | /login | User Login |
| GET | /quiz | Fetch quizzes |
| POST | /quiz | Create Quiz |
| PUT | /quiz/:id | Update Quiz |
| DELETE | /quiz/:id | Delete Quiz |

> Update the above endpoints according to your actual implementation.

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing with bcrypt
- Helmet HTTP Security Headers
- Environment Variables
- CORS Configuration
- Input Validation
- Secure Password Storage

---

# 🚀 Future Improvements

- Docker Support
- Swagger API Documentation
- Unit Testing
- Refresh Token Authentication
- Role-Based Access Control (RBAC)
- API Rate Limiting
- CI/CD using GitHub Actions
- Redis Caching
- Centralized Error Handling

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Gaurang Vishnoi**

Software Engineer | Node.js | JavaScript | Angular | MySQL | Flutter

GitHub:
https://github.com/GaurangVishnoi17