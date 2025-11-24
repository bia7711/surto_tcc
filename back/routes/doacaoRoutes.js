// doacaoRoutes.js

const express = require('express');
const router = express.Router();

/**
 * ROTA: POST /criar
 * Função: Receber os dados do formulário de doação do frontend.
 * * Esta rota deve ser acessada via: POST /api/doacao/criar
 * (assumindo que você configurou o Express para usar este arquivo com o prefixo '/api/doacao')
 */
router.post('/criar', (req, res) => {
    // req.body contém os dados JSON enviados pelo formulário do frontend
    const dadosDoacao = req.body;

    // --- 1. Exibir os dados recebidos no terminal (para teste) ---
    console.log('-------------------------------------------');
    console.log('✅ Dados de Doação recebidos com sucesso:');
    console.log('Nome:', dadosDoacao.nome);
    console.log('Email:', dadosDoacao.email);
    console.log('Valor:', dadosDoacao.valor);
    console.log('Recorrência:', dadosDoacao.recorrencia);
    console.log('Documento:', dadosDoacao.documento);
    console.log('-------------------------------------------');

    // --- 2. Lógica para salvar no Banco de Dados viria aqui ---
    // Exemplo:
    // DoacaoModel.create(dadosDoacao) 
    //   .then(() => res.status(201).json({ message: 'Doação registrada com sucesso no DB!' }))
    //   // ... etc

    // --- 3. Enviar resposta de sucesso para o frontend ---
    // O status 200 (OK) ou 201 (Criado) é o que o frontend espera para mostrar o alerta de sucesso.
    res.status(200).json({ 
        message: 'Doação recebida pelo servidor com sucesso!' 
    });
});

module.exports = router;