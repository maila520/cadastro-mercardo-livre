
$(document).ready(function() {
    $('#tabela-consumidores').DataTable({
        ajax: {
            url: 'http://localhost:3000/api/consumidor',
            dataSrc: ''
        },
        columns: [
            { data: 'nome' },
            { data: 'cpf' },
            { data: 'endereco' },
            { data: 'telefone' },
            { data: 'email' },
            { data: 'senha' }
        ]
    });
});

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica se tem 11 dígitos e não são todos iguais

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto >= 10 ? 0 : resto;

    if (parseInt(cpf.charAt(9)) !== digito1) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto >= 10 ? 0 : resto;

    return parseInt(cpf.charAt(10)) === digito2;
}


// Função para abrir modal
function abrirModal(titulo, mensagem) {
    const modalElement = document.getElementById('meuModal');
    const modalTitle = modalElement.querySelector('.modal-title');
    const modalBody = modalElement.querySelector('.modal-body');

    modalTitle.textContent = titulo;
    modalBody.textContent = mensagem;

    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Form Consumidor
document.getElementById('form-consumidor').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const nome = document.getElementById('nomeConsumidor').value;
    const cpf = document.getElementById('cpfConsumidor').value;
    const endereco = document.getElementById('enderecoConsumidor').value;
    const telefone = document.getElementById('telefoneConsumidor').value;
    const email = document.getElementById('emailConsumidor').value;
    const senha = document.getElementById('senhaConsumidor').value;

    // if (!validarCPF(cpf)) {
    //     submitBtn.classList.remove('loading');
    //     submitBtn.disabled = false;
    //     Swal.fire({
    //         icon: "error",
    //         title: "CPF Inválido",
    //         text: "Por favor, insira um CPF válido no formato xxx.xxx.xxx-xx",
    //         confirmButtonColor: "#667eea"
    //     });
    //     return;
    // }

    const consumidor = { nome, cpf, endereco, telefone, email, senha };

    try {
        const resposta = await fetch('/api/consumidor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consumidor)
        });

        if (resposta.ok) {
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Consumidor cadastrado com sucesso!",
                confirmButtonColor: "#667eea"
            });
            this.reset();
            bootstrap.Modal.getInstance(document.getElementById('modal-consumidor')).hide();
        } else {
            throw new Error("Erro no servidor");
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Erro ao cadastrar consumidor. Tente novamente.",
            confirmButtonColor: "#667eea"
        });
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});


// Máscaras para CPF
function aplicarMascaraCPF(input) {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
}

// Aplicar máscaras
aplicarMascaraCPF(document.getElementById('cpfConsumidor'));

// Máscara para telefone
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });
}

aplicarMascaraTelefone(document.getElementById('telefoneConsumidor'));


// Efeito de partículas no fundo
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(255, 255, 255, 0.1)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';

    document.body.appendChild(particle);

    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });

    animation.onfinish = () => particle.remove();
}

// Criar partículas periodicamente
setInterval(createParticle, 300);