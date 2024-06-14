# Dositio API Documentation

## Overview

Dositio is a backend project developed using Node.js/Fastify with non-relational databases (MongoDB). It provides a CRUD for books and an authentication route (`/auth`). 

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm start
```

The server will start at the specified port and host, as configured in the environment variables.

## API Documentation

### Routes

#### Books

- `GET /books`: Retrieves all books.
- `GET /books/:id`: Retrieves a book by ID.
- `POST /books`: Creates a new book. Requires authentication.
- `PUT /books/:id`: Updates a book by ID. Requires authentication.
- `DELETE /books/:id`: Deletes a book by ID. Requires authentication.

#### Categories

- `GET /categories`: Retrieves all categories.
- `GET /categories/:id`: Retrieves a category by ID.
- `POST /categories`: Creates a new category. Requires authentication.
- `PUT /categories/:id`: Updates a category by ID. Requires authentication.
- `DELETE /categories/:id`: Deletes a category by ID. Requires authentication.

#### Authentication

- `POST /auth`: Authenticates a user and returns an access token.
- `POST /register`: Registers a new user.

## Environment Variables

Make sure to set the following environment variables:

- `STAGE`: Environment stage (`dev`, `test`, `prod`).
- `PORT`: Port number for the server.
- `HOST`: Host address for the server.
- `JWT_SECRET`: Secret key for JWT authentication.
- `DB_URL`: MongoDB database URL.

---