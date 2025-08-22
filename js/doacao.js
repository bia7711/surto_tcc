document.addEventListener('DOMContentLoaded', function() {
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

    proximoPassoButton.addEventListener('click', function() {
        if (formDoador.checkValidity()) {
            dadosDoadorSection.style.display = 'none';
            dadosDoacaoSection.style.display = 'block';
        } else {
            formDoador.reportValidity();
        }
    });

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
        outroSexoInput.style.display = this.checked ? 'block' : 'none';
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
        const formDataDoador = new FormData(document.getElementById('form-doador'));
        const formDataDoacao = new FormData(this);

        const dadosDoador = Object.fromEntries(formDataDoador.entries());
        const dadosDoacao = Object.fromEntries(formDataDoacao.entries());

        console.log('Dados do Doador:', dadosDoador);
        console.log('Dados da Doação:', dadosDoacao);

        alert('Doação simulada com sucesso (dados no console)!');
        
    });
});

