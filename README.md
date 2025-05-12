# 🧪 Clean Architecture Auth API (TDD-Driven)

This project demonstrates a **Test-Driven Development (TDD)** approach to building an authentication system using **Clean Architecture principles** in **Node.js**.

## 📁 Project Structure

src/
├── domain/
│ └── usecases/
│ └── auth-usecase.js # Core business logic for authentication
├── infra/
│ └── (to be added) # Real implementations of encryption & repositories
├── utils/
│ └── errors.js # Custom error classes (e.g., MissingParamError)
└── tests/
└── domain/
└── auth-usecase.spec.js # Unit tests for AuthUseCase


## 📜 Use Case: `AuthUseCase`

Handles the logic for authenticating a user:
- Validates required fields
- Loads user data by email
- Verifies password using an encrypter
- (Future) Generates and returns an access token

## ✅ Features

- 💡 Clean Architecture separation of concerns
- 🔁 Fully unit-tested with **spies/mocks**
- 🧪 Built using **Test-Driven Development**
- 💬 Descriptive errors for missing parameters
- 🛡️ Future extensibility: token generation, logging, etc.

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 14
- NPM or Yarn

### Installation

```bash
git clone https://github.com/AyoubGhaddab/clean-node-api.git
cd clean-node-api
npm install

🧑‍💻 Author
Created as part of a learning path on TDD + Clean Architecture.