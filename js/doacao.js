document.addEventListener('DOMContentLoaded', function() {
    // Adicionado: Referência ao checkbox dos termos
    const checkboxTermos = document.getElementById('termos'); 
    
    // Elementos existentes
    const formDoador = document.getElementById('form-doador');
    const dadosDoadorSection = document.getElementById('dados-doador');
    const dadosDoacaoSection = document.getElementById('dados-doacao');
    const proximoPassoButton = document.getElementById('proximo-passo');
    const voltarPassoButton = document.getElementById('voltar-passo');
    const valoresDoacaoBotoes = document.querySelectorAll('.valores-doacao .value-button');
    const outroValorInput = document.getElementById('outro-valor-input');
    const valorDoacaoInput = document.getElementById('valor-doacao');
    const sexoOutroRadio = document.getElementById('outro');
    const outroSexoInput = document.getElementById('outro-sexo');
    const frequenciaDoacaoBotoes = document.querySelectorAll('.frequencia-doacao .frequency-button');
    const frequenciaDoacaoInput = document.getElementById('frequencia-doacao');

    // =============================================================
    // CORREÇÃO: Lógica para Habilitar/Desabilitar o botão (Passo 1)
    // =============================================================
    
    // Estado inicial: Se o botão estiver com 'disabled' no HTML, essa linha apenas reforça.
    proximoPassoButton.disabled = !checkboxTermos.checked;

    // Habilita/Desabilita o botão ao mudar o estado do checkbox
    checkboxTermos.addEventListener('change', function() {
        proximoPassoButton.disabled = !this.checked;
    });

    // =============================================================
    // CORREÇÃO: Lógica do botão Próximo Passo
    // =============================================================
    proximoPassoButton.addEventListener('click', function() {
        // Verifica se os termos foram aceitos
        if (!checkboxTermos.checked) {
            alert('Por favor, aceite os Termos e Condições para prosseguir.');
            return; // Impede o avanço
        }

        // Verifica a validade dos outros campos do formulário
        if (formDoador.checkValidity()) {
            dadosDoadorSection.style.display = 'none';
            dadosDoacaoSection.style.display = 'block';
        } else {
            // Exibe as mensagens de erro nativas do navegador
            formDoador.reportValidity();
        }
    });

    // =============================================================
    // RESTANTE DO CÓDIGO (MANTIDO E CORRETO)
    // =============================================================

    voltarPassoButton.addEventListener('click', function() {
        dadosDoacaoSection.style.display = 'none';
        dadosDoadorSection.style.display = 'block';
    });

    valoresDoacaoBotoes.forEach(botao => {
        botao.addEventListener('click', function() {
            valoresDoacaoBotoes.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            valorDoacaoInput.value = this.dataset.valor;
            outroValorInput.value = '';
        });
    });

    outroValorInput.addEventListener('input', function() {
        if (this.value) {
            valoresDoacaoBotoes.forEach(btn => btn.classList.remove('selected'));
            valorDoacaoInput.value = this.value;
        } else if (!document.querySelector('.valores-doacao .value-button.selected')) {
            valorDoacaoInput.value = '';
        }
    });

    sexoOutroRadio.addEventListener('change', function() {
        // Garante que o campo de texto apareça/desapareça e limpa se não estiver selecionado
        outroSexoInput.style.display = this.checked ? 'block' : 'none';
        outroSexoInput.required = this.checked; // Adiciona/remove o 'required'
        if (!this.checked) {
            outroSexoInput.value = '';
        }
    });

    frequenciaDoacaoBotoes.forEach(botao => {
        botao.addEventListener('click', function() {
            frequenciaDoacaoBotoes.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            frequenciaDoacaoInput.value = this.dataset.frequencia;
        });
    });

    document.getElementById('form-doacao').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Verificação adicional para garantir que o valor da doação foi selecionado/inserido
        if (!valorDoacaoInput.value) {
            alert('Por favor, selecione ou digite um valor para doação.');
            return;
        }

        const formDataDoador = new FormData(document.getElementById('form-doador'));
        const formDataDoacao = new FormData(this);

        const dadosDoador = Object.fromEntries(formDataDoador.entries());
        const dadosDoacao = Object.fromEntries(formDataDoacao.entries());

        console.log('Dados do Doador:', dadosDoador);
        console.log('Dados da Doação:', dadosDoacao);

        alert('Doação simulada com sucesso (dados no console)!');
    });
});