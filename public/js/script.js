function abrirModal(titulo, mensagem) {
    const modalElement = document.getElementById('meuModal');
    const modalTitle = modalElement.querySelector('.modal-title');
    const modalBody = modalElement.querySelector('.modal-body');

    modalTitle.textContent = titulo;
    modalBody.textContent = mensagem;

    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}


document.getElementById('form-consumidor').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeConsumidor').value;
    const cpf = document.getElementById('cpfConsumidor').value;
    const endereco = document.getElementById('enderecoConsumidor').value;
    const telefone = document.getElementById('telefoneConsumidor').value;
    const email = document.getElementById('emailConsumidor').value;
    const senha = document.getElementById('senhaConsumidor').value;


    if (!validarCPF(cpf)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "CPF inválido. Use o formato xxx.xxx.xxx-xx",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }

    const consumidor = {
        nome, cpf, endereco, telefone, email, senha
    };


    const resposta = await fetch('/api/consumidor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consumidor)
    });

    if (resposta.ok) {
        if (resposta.ok) {
            abrirModal("Sucesso!", "Consumidor cadastrado com sucesso!");
            this.reset();
        }

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Erro ao cadastrar!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });

    }


});



document.getElementById('form-vendedor').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeVendedor').value;
    const cpf = document.getElementById('cpfVendedor').value;
    const endereco = document.getElementById('enderecoVendedor').value;
    const telefone = document.getElementById('telefoneVendedor').value;
    const email = document.getElementById('emailVendedor').value;
    const senha = document.getElementById('senhaVendedor').value;
    const banco = document.getElementById('bancoVendedor').value;
    const agencia = document.getElementById('agenciaVendedor').value;
    const conta = document.getElementById('contaVendedor').value;


    if (!validarCPF(cpf)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "CPF inválido. Use o formato xxx.xxx.xxx-xx",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
    }

    const vendedor = {
        nome, cpf, endereco, telefone, email, senha, banco, agencia, conta
    };

    const resposta = await fetch('/api/vendedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendedor)
    });

    if (resposta.ok) {
        if (resposta.ok) {
            abrirModal("Sucesso!", "vendedor cadastrado com sucesso!");
            this.reset();
        }

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Erro ao cadastrar!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });

    }
});


document.getElementById('form-produto').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const prazo_entrega = document.getElementById('prazoProduto').value;

    const produto = {
        nome,
        descricao,
        preco,
        prazo_entrega
    };
    console.log(produto)

    try {
        const resposta = await fetch('/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (resposta.ok) {
            if (resposta.ok) {
                abrirModal("Sucesso!", "Produto cadastrado com sucesso!");
                this.reset();
            }

        } else {
            throw new Error("Erro no servidor");
        }
    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Erro ao cadastrar!",
            text: err.message
        });
    }
});
