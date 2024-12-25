Here’s a more formal version of your project description for documentation:

---

## Project Overview: **Books-Todo App - Sukumaran**

## Overview
The **Books-Todo** App Management is a Node.js-based application designed to help users efficiently manage and organize their tasks. It provides a comprehensive task management system with user authentication, secure task CRUD operations, and personalized task handling, ensuring a streamlined and user-friendly experience.

## Key Features
### 1. User Authentication
- **User Signup and Login**: Users can create accounts and log in to access the system.
- **JWT-based Authentication**: Secure user access through JSON Web Tokens (JWT).
- **Password Security:**: User passwords are hashed before being stored in the database.

### 2.todo Task Management
- **CRUD Operations**: Allows users to create, read, update, and delete tasks.
- **Book Association**: Each book is linked to a specific user, ensuring personalized book management.
- **Pagination with DataTables**: Supports advanced interaction controls for book listings using the DataTables.net package to enhance table functionality, including pagination.

### 3. Middleware
- **Protected Routes**: Implements route protection to ensure that only authenticated users can access task-related endpoints.
- **Input Validation**: Validates all POST and UPDATE requests to ensure data integrity and security.

### API Endpoints
POST /api/signup - Sign up a new user

Request body: { "email": "user@example.com", "password": "password123" }
POST /api/login - Log in an existing user

Request body: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt_token" }

1. POST /api/books - Create a new Book

Request body: { "title": "NodeJs Learning", author:"Jack", year:"2024","completed": false }
2. GET /api/books - List all books for the authenticated user

3. GET /api/book/:id -  Get a book by ID.

4. PUT /api/books/:id - Update a book by ID

Request body: { "title": "MongoDB Learning", author:"Sam", year:"2025", "completed": true }
5. DELETE /api/books/:id - Delete a book by ID

### Validation and Error Handling
- **Input Validation**: Email format, Book title, and other required fields are validated.
- **Error Handling**: Provides proper error messages for invalid credentials, unauthorized access, and missing fields.

### Project Structure

Follows the MVC (Model-View-Controller) structure for clean, modular, and reusable code.

## Technology Stack
1. **Node.js**: A JavaScript runtime for building server-side applications.
2. **Express.js**: A web framework used for building RESTful APIs.
3. **MongoDB**: A NoSQL database for storing user and book information (utilizing MongoDB's free cloud database).
4. **Mongoose**: An Object Data Modeling (ODM) library for managing MongoDB with Node.js.
---


**Books-Todo** App Management Link:- http://localhost:7030/api/books-todo-app
