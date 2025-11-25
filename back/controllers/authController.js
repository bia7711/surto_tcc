// controllers/authController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { nome, sobrenome, email, senha, confirmar_senha, terms } = req.body;

    // Validate required fields
    if (!nome || !sobrenome || !email || !senha || !confirmar_senha) {
      return res.status(400).json({ message: "Por favor, preencha todos os campos obrigatórios." });
    }

    // Validate password confirmation
    if (senha !== confirmar_senha) {
      return res.status(400).json({ message: "As senhas não conferem." });
    }

    // Validate terms agreement
    if (!terms) {
      return res.status(400).json({ message: "Você deve concordar com os termos." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    // Create user in DB
    const userId = await User.createUser({ nome, sobrenome, email, hashedSenha });

    return res.status(201).json({ message: "Usuário registrado com sucesso.", userId });
  } catch (error) {
    console.error(error);

    // Handle duplicate email error (MySQL ER_DUP_ENTRY) or other DB errors
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "Email já cadastrado." });
    }

    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};
