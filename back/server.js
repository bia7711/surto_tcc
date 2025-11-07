// server.js

// 1. Importa o framework Express
const express = require('express');

// 2. Inicializa o aplicativo Express
const app = express();

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Configura uma rota de teste (GET na raiz "/")
app.get('/', (req, res) => {
    res.send('O servidor do TCC está funcionando! Bem-vindo ao backend.');
});

// 3. Inicia o servidor e fica "escutando" na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});