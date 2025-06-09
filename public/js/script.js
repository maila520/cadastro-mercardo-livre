
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
            { data: 'email' }
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

document.getElementById('form-vendedor').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const nome = document.getElementById('nomeVendedor').value;
    const cpf = document.getElementById('cpfVendedor').value;
    const endereco = document.getElementById('enderecoVendedor').value;
    const telefone = document.getElementById('telefoneVendedor').value;
    const email = document.getElementById('emailVendedor').value;
    const senha = document.getElementById('senhaVendedor').value;
    const banco = document.getElementById('bancoVendedor').value;
    const agencia = document.getElementById('agenciaVendedor').value;
    const conta = document.getElementById('contaVendedor').value;

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

    const vendedor = { nome, cpf, endereco, telefone, email, senha, banco, agencia, conta };

    try {
        const resposta = await fetch('/api/vendedor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vendedor)
        });

        if (resposta.ok) {
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Vendedor cadastrado com sucesso!",
                confirmButtonColor: "#667eea"
            });
            this.reset();
            bootstrap.Modal.getInstance(document.getElementById('modal-vendedor')).hide();
        } else {
            throw new Error("Erro no servidor");
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Erro ao cadastrar vendedor. Tente novamente.",
            confirmButtonColor: "#667eea"
        });
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Form Produto
document.getElementById('form-produto').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const prazo_entrega = document.getElementById('prazoProduto').value;

    const produto = { nome, descricao, preco, prazo_entrega };

    try {
        const resposta = await fetch('/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (resposta.ok) {
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Produto cadastrado com sucesso!",
                confirmButtonColor: "#667eea"
            });
            this.reset();
            // Reset file input label
            document.querySelector('.file-input-label').innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Selecionar foto do produto';
            bootstrap.Modal.getInstance(document.getElementById('modal-produto')).hide();
        } else {
            throw new Error("Erro no servidor");
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Erro ao cadastrar produto. Tente novamente.",
            confirmButtonColor: "#667eea"
        });
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Melhorar o feedback do input de arquivo
document.getElementById('fotoProduto').addEventListener('change', function (e) {
    const label = document.querySelector('.file-input-label');
    const fileName = e.target.files[0]?.name;

    if (fileName) {
        label.innerHTML = `<i class="fas fa-check-circle"></i> ${fileName}`;
        label.style.borderColor = '#48bb78';
        label.style.color = '#48bb78';
    } else {
        label.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Selecionar foto do produto';
        label.style.borderColor = '#cbd5e0';
        label.style.color = '#4a5568';
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
aplicarMascaraCPF(document.getElementById('cpfVendedor'));

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
aplicarMascaraTelefone(document.getElementById('telefoneVendedor'));

// Formatação de preço
document.getElementById('precoProduto').addEventListener('input', function (e) {
    let value = e.target.value;
    // Remove caracteres não numéricos exceto ponto e vírgula
    value = value.replace(/[^\d.,]/g, '');
    e.target.value = value;
});

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