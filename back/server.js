// server.js

// 1. Importações Essenciais
const express = require('express');
// 💡 NOVO: Importa o CORS
const cors = require('cors'); 
require('dotenv').config(); 
const app = express();

// 2. Configurações (Middleware)
// 💡 NOVO: Permite requisições de outras origens (como o Live Server - porta 5500)
app.use(cors()); 

// Permite que o servidor leia o corpo da requisição (JSON e Formulários)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 3. Configuração de Rotas
const contatoRoutes = require('./routes/contatoRoutes');
app.use('/api/contato', contatoRoutes); 

// 4. Inicialização
const PORT = process.env.PORT || 3001;

// Rota de teste na raiz
app.get('/', (req, res) => {
    res.send('O servidor do TCC está funcionando! Bem-vindo ao backend.');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});