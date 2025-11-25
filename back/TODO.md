# Backend User Registration - TODO

## Dependencies
- Run the following command in the `surto_tcc/back` directory to install required packages:
  ```
  npm install mysql2 bcryptjs
  ```

## Environment Setup
- Create a `.env` file in the `surto_tcc/back` folder with the following environment variables:
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_password
  DB_NAME=surto_tcc_db
  PORT=3001
  ```

## Database Setup
- Create a MySQL database named `surto_tcc_db` (or the name you set in `.env`).
- Create a `users` table with the following structure:

  ```sql
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

## Running the Backend
- Start the backend server from `surto_tcc/back`:
  ```
  npm run start:dev
  ```
- The backend should be running at `http://localhost:3001`.

## Testing Registration Endpoint
- Use a REST client (Postman, Insomnia, etc.) or frontend form to POST to:
  ```
  POST http://localhost:3001/api/auth/register
  ```
- Body (JSON):
  ```json
  {
    "nome": "SeuNome",
    "sobrenome": "SeuSobrenome",
    "email": "email@example.com",
    "senha": "SuaSenha123",
    "confirmar_senha": "SuaSenha123",
    "terms": true
  }
  ```
- You should receive a success message if registration is valid.
