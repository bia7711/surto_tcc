// *** PORTA DO BACKEND AJUSTADA PARA 3001 ***
const SERVER_URL = 'http://localhost:3001/doacao'; 
        
document.addEventListener('DOMContentLoaded', () => {
    
    // Referências de Elementos do DOM
    const form = document.getElementById('donationForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const progressBar = document.getElementById('progressBar');
    const stepTitle = document.getElementById('stepTitle');
    const statusMessage = document.getElementById('statusMessage');
    const statusText = document.getElementById('statusText');
    const spinner = document.getElementById('spinner');
    const resetBtn = document.getElementById('resetBtn');
    const donationCard = document.getElementById('donationCard');

    // Elementos de Doação
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const frequencyButtons = document.querySelectorAll('.frequency-btn');
    const finalAmountText = document.getElementById('finalAmountText');
    const donationAmountInput = document.getElementById('donationAmount');
    const donationFrequencyInput = document.getElementById('donationFrequency');

    let currentStep = 1;
    let currentAmount = 50.00; // Valor inicial

    // --- FUNÇÕES DE UTILDADE ---

    // Utilitário para formatar moeda
    const formatCurrency = (value) => {
        const num = parseFloat(value);
        return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Função para atualizar o valor da doação na tela e nos campos escondidos
    const updateAmount = (value) => {
        // Garante que o valor não é negativo e tem duas casas decimais
        currentAmount = Math.max(0.01, parseFloat(value || 0)).toFixed(2); 
        finalAmountText.textContent = formatCurrency(currentAmount);
        donationAmountInput.value = currentAmount;
        customAmountInput.value = currentAmount; // Mantém o input de texto sincronizado
    };

    // Função para gerenciar a transição de etapas
    const setStep = (step) => {
        currentStep = step;
        // Exibe/Esconde os painéis
        step1.classList.toggle('hidden', step !== 1);
        step2.classList.toggle('hidden', step !== 2);
        
        // Atualiza a barra de progresso e o título
        progressBar.style.width = step === 1 ? '50%' : '100%';
        stepTitle.textContent = step === 1 ? 'Etapa 1: Seus Dados' : 'Etapa 2: Valor e Pagamento';
    };

    // Função customizada para mensagens (substitui alert() nativo)
    const showCustomAlert = (message, isError = true) => {
        const alertStyle = isError ? 'bg-red-500' : 'bg-yellow-500';
        const textColor = 'text-white';
        
        const alertBox = document.createElement('div');
        alertBox.className = `fixed top-4 right-4 p-4 rounded-lg shadow-xl font-medium z-50 ${alertStyle} ${textColor}`;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3500);
    };

    // --- LÓGICA DE INTERAÇÃO ---

    // 1. Lógica de Seleção de Valor (Botões)
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            updateAmount(parseFloat(button.getAttribute('data-value')));
        });
    });

    // 2. Lógica do Input de Valor Personalizado
    customAmountInput.addEventListener('input', () => {
        let value = parseFloat(customAmountInput.value);

        // Remove a seleção dos botões pré-definidos ao digitar
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        updateAmount(value);
    });
    
    // 3. Lógica da Seleção de Frequência
    frequencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            frequencyButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            const freq = button.getAttribute('data-freq');
            donationFrequencyInput.value = freq;
        });
    });

    // 4. Transição para a Etapa 2
    nextStepBtn.addEventListener('click', () => {
        const requiredInputs = step1.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            // Verifica se o campo está vazio ou contém apenas espaços
            if (!input.value.trim()) { 
                isValid = false;
                // Adiciona destaque de erro
                input.classList.add('border-red-500', 'ring-1', 'ring-red-500'); 
            } else {
                // Remove destaque de erro se for válido
                input.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
            }
        });

        if (isValid) {
            setStep(2);
            // Rolagem suave para o topo do card
            window.scrollTo({ top: donationCard.offsetTop - 50, behavior: 'smooth' });
        } else {
            showCustomAlert('Por favor, preencha todos os campos obrigatórios da Etapa 1.', true);
        }
    });

    // 5. Transição para a Etapa 1 (Voltar)
    prevStepBtn.addEventListener('click', () => {
        setStep(1);
        window.scrollTo({ top: donationCard.offsetTop - 50, behavior: 'smooth' });
    });

    // 6. Lógica de Submissão (Integração com o Backend)
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validação final da Etapa 2
        if (!document.getElementById('paymentMethod').value) {
            showCustomAlert('Por favor, selecione uma forma de pagamento.', true);
            return;
        }
        if (parseFloat(donationAmountInput.value) < 1) {
            showCustomAlert('O valor da doação deve ser de no mínimo R$ 1,00.', true);
            return;
        }
        
        // Exibir loading (esconde o formulário, mostra o status)
        form.classList.add('hidden');
        statusMessage.classList.remove('hidden');
        spinner.classList.remove('hidden');
        statusText.classList.remove('text-green-600', 'text-red-500');
        statusText.textContent = 'Processando sua doação. Aguarde...';
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Garantir que o valor é um número de ponto fixo (limpa o campo de customAmount)
        data.donationAmount = parseFloat(donationAmountInput.value);
        delete data.customAmount; // Remove o input temporário

        try {
            // Tenta se conectar ao server.js na porta 3001
            const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            spinner.classList.add('hidden');
            resetBtn.classList.remove('hidden');

            if (response.ok && result.success) { // Verifica se o status HTTP foi 200-299 e o body indica sucesso
                statusText.classList.add('text-green-600');
                statusText.textContent = `🎉 Doação de ${formatCurrency(data.donationAmount)} ${data.donationFrequency.toLowerCase()} processada! ID: ${result.transactionDetails.id}`;
            } else {
                // Trata erros de validação do lado do servidor ou outros erros
                statusText.classList.add('text-red-500');
                statusText.textContent = `🚫 Erro: ${result.message || 'Falha ao processar doação.'}`;
            }

        } catch (error) {
            // Erro de conexão (server.js não está rodando ou URL errada)
            spinner.classList.add('hidden');
            resetBtn.classList.remove('hidden');
            statusText.classList.add('text-red-500');
            statusText.textContent = `🚫 Falha de Conexão. Verifique se o servidor (${SERVER_URL}) está ativo na porta 3001.`;
            console.error('Erro de requisição:', error);
        }
    });
    
    // 7. Lógica para resetar o formulário
    resetBtn.addEventListener('click', () => {
        form.reset();
        // Reseta os inputs escondidos e o valor
        document.getElementById('donationFrequency').value = 'Mensal';
        document.getElementById('paymentMethod').value = '';
        
        setStep(1); // Volta para a primeira etapa
        statusMessage.classList.add('hidden');
        form.classList.remove('hidden');
        statusText.classList.remove('text-green-600', 'text-red-500');
        resetBtn.classList.add('hidden');
        
        // Reseta seleção visual de valor e frequência
        updateAmount(50.00); // R$ 50,00 padrão
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        // Seleciona o botão de R$ 50,00 (que é o segundo no HTML)
        amountButtons[1].classList.add('selected'); 
        
        frequencyButtons.forEach(btn => {
            btn.classList.remove('selected');
            if (btn.getAttribute('data-freq') === 'Mensal') {
                btn.classList.add('selected');
            }
        });
    });

    // --- INICIALIZAÇÃO ---
    updateAmount(currentAmount); // Configura o valor inicial
});