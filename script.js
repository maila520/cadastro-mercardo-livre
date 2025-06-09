document.getElementById('form-produto').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const prazo = document.getElementById('prazoProduto').value;

    const produtoDiv = document.createElement('div');
    produtoDiv.innerHTML = `
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Descrição:</strong> ${descricao}</p>
    <p><strong>Preço:</strong> R$ ${preco}</p>
    <p><strong>Prazo de Entrega:</strong> ${prazo}</p>
    <button onclick="this.parentElement.remove()">Excluir</button>
    <hr>
  `;

    document.getElementById('lista-produtos').appendChild(produtoDiv);


    this.reset();
});

function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}
document.getElementById('form-consumidor').addEventListener('submit', function (e) {
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

    let consumidores = JSON.parse(localStorage.getItem("consumidores")) || [];
    consumidores.push(consumidor);
    localStorage.setItem("consumidores", JSON.stringify(consumidores));

    Swal.fire({
        title: "Consumidor cadastrado com sucesso!",
        icon: "success",
        draggable: true
    });
    this.reset();
});


document.getElementById('form-vendedorr').addEventListener('submit', function (e) {
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

    const consumidor = {
        nome, cpf, endereco, telefone, email, senha, banco, agencia, conta
    };

    let consumidores = JSON.parse(localStorage.getItem("consumidores")) || [];
    consumidores.push(consumidor);
    localStorage.setItem("consumidores", JSON.stringify(consumidores));

    Swal.fire({
        title: "Vendedor cadastrado com sucesso!",
        icon: "success",
        draggable: true
    });
    this.reset();
});


