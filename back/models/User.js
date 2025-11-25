// models/User.js

const pool = require('../config/database');

const createUser = async ({ nome, sobrenome, email, hashedSenha }) => {
  const sql = 'INSERT INTO users (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await pool.execute(sql, [nome, sobrenome, email, hashedSenha]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
