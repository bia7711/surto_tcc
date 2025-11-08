document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos de controle
    const stepOne = document.getElementById('step-one');
    const stepTwo = document.getElementById('step-two');
    const step1Title = document.getElementById('step1-title');
    const step2Title = document.getElementById('step2-title');
    const nextButton = document.getElementById('next-to-step2');
    const prevButton = document.getElementById('prev-to-step1');
    const formPessoal = document.getElementById('form-pessoal');
    const formPagamento = document.getElementById('form-pagamento');
    const hiddenFrequencia = document.getElementById('frequencia-doacao');

    // Referências aos elementos de valor e frequência
    const amountRadios = document.querySelectorAll('input[name="valor"]');
    const otherAmountField = document.getElementById('other-amount-field');
    const typeMensal = document.getElementById('type-mensal');
    const typeUnica = document.getElementById('type-unica');

    // --- A. CONTROLE DE PASSOS ---
    
    // Avançar para o Passo 2
    nextButton.addEventListener('click', (e) => {
        // Verifica se o formulário do Passo 1 é válido (campos 'required' preenchidos)
        if (!formPessoal.checkValidity()) {
            formPessoal.reportValidity();
            return;
        }

        stepOne.classList.remove('active');
        stepTwo.classList.add('active');
        step1Title.classList.remove('active');
        step2Title.classList.add('active');
        window.scrollTo(0, 0); 
    });

    // Voltar para o Passo 1
    prevButton.addEventListener('click', () => {
        stepTwo.classList.remove('active');
        stepOne.classList.add('active');
        step2Title.classList.remove('active');
        step1Title.classList.add('active');
        window.scrollTo(0, 0); 
    });


    // --- B. LÓGICA DE VALOR E FREQUÊNCIA (UX) ---

    // Lógica do Campo 'Outro Valor'
    amountRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'outro') {
                otherAmountField.classList.remove('hidden');
                document.getElementById('valor-outro').setAttribute('required', 'required');
            } else {
                otherAmountField.classList.add('hidden');
                document.getElementById('valor-outro').removeAttribute('required');
            }
        });
    });

    // Lógica de Frequência (Mensal/Única)
    typeMensal.addEventListener('click', () => {
        typeMensal.classList.add('active');
        typeUnica.classList.remove('active');
        hiddenFrequencia.value = 'mensal';
    });
    
    typeUnica.addEventListener('click', () => {
        typeUnica.classList.add('active');
        typeMensal.classList.remove('active');
        hiddenFrequencia.value = 'unica';
    });


    // --- C. ENVIO FINAL (Integração com o Back-End) ---
    formPagamento.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Coletar e Unir os Dados
        const dadosPessoais = new FormData(formPessoal);
        const dadosPagamento = new FormData(formPagamento);
        
        const data = {};
        
        for (const [key, value] of dadosPessoais.entries()) {
            data[key] = value;
        }
        for (const [key, value] of dadosPagamento.entries()) {
            data[key] = value;
        }
        
        // 2. Determinar o Valor Final da Doação
        let valorDoacao = data['valor'];
        if (valorDoacao === 'outro') {
            valorDoacao = data['valor-outro'];
        }
        data['valorFinal'] = parseFloat(valorDoacao); // Converte para número

        // Remove campos temporários
        delete data['valor'];
        delete data['valor-outro'];


        try {
            // CORREÇÃO APLICADA AQUI: Adicionado o parêntese (
            const response = await fetch('http://localhost:3001/api/doacao', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Doação realizada com sucesso! Os dados foram enviados para o servidor.');
                // Resetar formulários e voltar ao passo 1
                formPessoal.reset();
                formPagamento.reset();
                prevButton.click(); // Simula o clique no botão 'Voltar' para retornar ao Passo 1
                typeUnica.click(); // Garante que a frequência volte a ser 'Única'
            } else {
                alert('Erro ao processar doação. Verifique o servidor (porta 3001).');
            }
        } catch (error) {
            console.error('Erro na conexão:', error);
            alert('Erro na conexão com o servidor de doação. Verifique se o Back-End está rodando.');
        }
    });

});