$(document).ready(function () {
    $('#tabela-produtos').DataTable({
        ajax: {
            url: 'http://localhost:3000/api/produtos-filter',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'nome' },
            { data: 'descricao' },
            { data: 'preco' },
            { data: 'prazo_entrega' },
            {
                data: 'id',
                orderable: false,
                render: function (id) {
                    return `
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-sm btn-warning" onclick="editarProduto('${id}')" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>


                            <button type="button" class="btn btn-sm btn-danger" onclick="confirmarExclusao('${id}')" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }
            }

        ]
    });
});


function confirmarExclusao(id) {
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Essa ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/api/produtos/excluir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'sucesso') {
                        Swal.fire({
                            title: 'Excluído!',
                            text: 'Produto excluído com sucesso.',
                            icon: 'success'
                        }).then(() => {
                            // Atualizar a tabela ou realizar outra ação após a exclusão
                            // Você pode recarregar a página ou atualizar a tabela aqui
                            // Exemplo: location.reload();
                            $('#tabela-produtos').DataTable().ajax.reload();
                        });
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Erro ao excluir produto: ' + data.mensagem,
                            icon: 'error'
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao excluir produto: ' + error,
                        icon: 'error'
                    });
                });
        }
    });
}


function editarProduto(id) {
    // Abre um modal para editar o produto
    Swal.fire({
        title: 'Editar Produto',
        html:
            `
            <form id="form-editar-produto">
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" class="form-control" id="nome" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="descricao">Descrição:</label>
                    <textarea class="form-control" id="descricao" name="descricao" required></textarea>
                </div>
                <div class="form-group">
                    <label for="preco">Preço:</label>
                    <input type="number" class="form-control" id="preco" name="preco" required>
                </div>
                <div class="form-group">
                    <label for="prazo_entrega">Prazo de Entrega:</label>
                    <input type="text" class="form-control" id="prazo_entrega" name="prazo_entrega" required>
                </div>
            </form>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const nome = document.getElementById('nome').value;
            const descricao = document.getElementById('descricao').value;
            const preco = document.getElementById('preco').value;
            const prazo_entrega = document.getElementById('prazo_entrega').value;

            return {
                nome,
                descricao,
                preco,
                prazo_entrega
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const produto = result.value;
            produto.id = id;

            fetch('/api/produtos/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'sucesso') {
                        Swal.fire({
                            title: 'Editado!',
                            text: 'Produto editado com sucesso.',
                            icon: 'success'
                        }).then(() => {
                            // Atualizar a tabela ou realizar outra ação após a edição
                            // Você pode recarregar a página ou atualizar a tabela aqui
                            // Exemplo: location.reload();
                            $('#tabela-produtos').DataTable().ajax.reload();
                        });
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Erro ao editar produto: ' + data.mensagem,
                            icon: 'error'
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao editar produto: ' + error,
                        icon: 'error'
                    });
                });
        }
    });

    // Carrega os dados do produto para editar
    fetch('/api/produtos/buscar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('nome').value = data.nome;
            document.getElementById('descricao').value = data.descricao;
            document.getElementById('preco').value = data.preco;
            document.getElementById('prazo_entrega').value = data.prazo_entrega;
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao carregar dados do produto: ' + error,
                icon: 'error'
            });
        });
}



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