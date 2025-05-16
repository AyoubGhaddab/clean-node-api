# 🧪 Clean Node.js Auth API — Clean Architecture & TDD

This project is a **Node.js authentication API** built using **Clean Architecture** principles and **Test-Driven Development (TDD)**. It demonstrates how to structure a scalable, maintainable, and testable backend for user authentication, with a focus on separation of concerns and robust error handling.

---

## 🚀 What Does This Project Do?

- **User Authentication:**  
  Provides a `/login` endpoint for authenticating users with email and password.

- **Clean Architecture:**  
  Divides the codebase into clear layers:  
  - **Presentation:** Handles HTTP requests/responses (Express, routers, adapters).
  - **Domain:** Business logic (use cases, entities).
  - **Infra:** Database access, encryption, token generation.
  - **Utils:** Shared helpers and error classes.

- **TDD & Testing:**  
  All business logic and infrastructure code is covered by unit and integration tests using Jest and Supertest.

- **Extensible & Maintainable:**  
  Easily add new features (e.g., signup, password reset) or swap infrastructure (e.g., database, token provider) with minimal changes.

---

## 📁 Project Structure

```
src/
├── domain/         # Business logic (use cases)
│   └── usecases/
├── infra/          # Database, encryption, token helpers
│   └── helpers/
│   └── repositories/
├── main/           # Express app, routes, middlewares, config
│   └── config/
│   └── middlewares/
│   └── routes/
├── presentation/   # HTTP layer (routers, adapters, errors)
│   └── helpers/
│   └── routers/
├── utils/          # Shared helpers and error classes
└── tests/          # (if present) Additional test files
```

---

## ✨ Key Features

- **/api/login** endpoint for user authentication
- Password hashing with bcrypt
- JWT token generation for access tokens
- MongoDB integration (with in-memory DB for tests)
- Custom error handling for missing/invalid params
- Full test coverage (unit & integration)
- Modern JavaScript (ES6+), modular codebase

---

## 🧪 Example: How Authentication Works

1. **Request:**  
   Client sends a POST to `/api/login` with email and password.

2. **Validation:**  
   - Checks for missing fields.
   - Validates email format.

3. **Authentication:**  
   - Loads user by email from MongoDB.
   - Compares password using bcrypt.
   - Generates JWT access token if valid.

4. **Response:**  
   - Returns `{ accessToken }` on success.
   - Returns appropriate error on failure.

---

## ✅ Running the Project

### Prerequisites

- Node.js ≥ 14
- MongoDB (local or Docker, or use in-memory for tests)

### Installation

```bash
git clone https://github.com/AyoubGhaddab/clean-node-api.git
cd clean-node-api
npm install
```

### Running Tests

```bash
npm test
```

### Starting the API

```bash
npm start
```

The server will run at [http://localhost:5858](http://localhost:5858) by default.

---

## 🛠️ Technologies Used

- Node.js, Express
- MongoDB (with [@shelf/jest-mongodb](https://github.com/shelfio/jest-mongodb) for testing)
- bcrypt, jsonwebtoken, validator
- Jest, Supertest
- Clean Architecture, TDD

---

## 👨‍💻 Author

Created by Mohamed Ayoub Ghaddab  
[GitHub](https://github.com/AyoubGhaddab)

---

## 📚 Learning & Inspiration

This project is inspired by best practices in Clean Architecture and TDD, and serves as a learning resource for building robust Node.js APIs.

---