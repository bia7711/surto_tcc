// controllers/contatoController.js

exports.enviarDuvida = (req, res) => {
    // 1. Recebe todos os dados do formulário
    const { nome, sobrenome, email, mensagem } = req.body; 
    
    // 2. Validação: Checa se todos os campos essenciais foram preenchidos
    if (!nome || !sobrenome || !email || !mensagem) {
        return res.status(400).send({ 
            message: "Por favor, preencha todos os campos obrigatórios." 
        });
    }

    // 3. Lógica de Negócios (FUTURA CONEXÃO COM O MYSQL/EMAIL):
    const nomeCompleto = `${nome} ${sobrenome}`;

    // *************
    // AQUI VOCÊ VAI ADICIONAR O CÓDIGO DE SALVAR NO MYSQL DEPOIS!
    // Exemplo: await ContatoModel.create({ nome: nomeCompleto, email, mensagem });
    // *************

    console.log("Dúvida recebida de:", nomeCompleto, "Email:", email);
    
    // 4. Resposta de Sucesso para o Frontend
    return res.status(201).send({ 
        message: "Sua dúvida foi enviada com sucesso! Em breve entraremos em contato.",
        nomeCompleto: nomeCompleto
    });
};