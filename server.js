const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Função para ler os dados do arquivo JSON
function lerDados(arquivo) {
    try {
        //const pasta = path.join(__dirname, 'data')
        const dados = fs.readFileSync(path.join(__dirname,'data' ,arquivo), 'utf8');
        return JSON.parse(dados);
    } catch (error) {
        console.error(`Erro ao ler dados de ${arquivo}: ${error}`);
        return [];
    }
}

// Função para salvar dados com tratamento de erros
function salvarDados(nomeArquivo, novoRegistro) {
    try {
        const pasta = path.join(__dirname, 'data');
        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta);
        }

        const caminho = path.join(pasta, nomeArquivo);
        let dados = [];

        if (fs.existsSync(caminho)) {
            const conteudo = fs.readFileSync(caminho, 'utf-8');
            try {
                dados = JSON.parse(conteudo) || [];
            } catch (e) {
                console.error('Erro ao fazer parse do arquivo JSON:', e);
                dados = [];
            }
        }

        dados.push(novoRegistro);
        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');
        return true;
    } catch (erro) {
        console.error('Erro ao salvar dados:', erro);
        return false;
    }
}


// Função para excluir um item com base no ID
function excluirItem(arquivo, id) {
    const dados = lerDados(arquivo);
    const index = dados.findIndex(item => item.id == id);
    const pasta = path.join(__dirname, 'data');
    if (index !== -1) {
        dados.splice(index, 1);
        // Aqui está o problema, você está adicionando os dados novamente
        // dados.push(...lerDados(arquivo)); // Remova essa linha se existir
        const caminho = path.join(pasta, arquivo);
        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
        console.log(`Item com ID ${id} excluído com sucesso!`);
        return true;
    } else {
        return false;
    }
}


// Rotas com verificação de sucesso
app.post('/api/consumidor', (req, res) => {
    const sucesso = salvarDados('consumidores.json', req.body);
    if (sucesso) {
        res.json({ status: 'sucesso' });
    } else {
        res.status(500).json({ status: 'erro', mensagem: 'Erro ao salvar consumidor' });
    }
});

app.post('/api/vendedor', (req, res) => {
    const sucesso = salvarDados('vendedor.json', req.body);
    if (sucesso) {
        res.json({ status: 'sucesso' });
    } else {
        res.status(500).json({ status: 'erro', mensagem: 'Erro ao salvar vendedor' });
    }
});

app.post('/api/produtos', (req, res) => {
    
    const sucesso = salvarDados('produtos.json', req.body);
    if (sucesso) {
        res.json({ status: 'sucesso' });
    } else {
        res.status(500).json({ status: 'erro', mensagem: 'Erro ao salvar produto' });
    }
});

app.post('/api/produtos/excluir', (req, res) => {
    const id = req.body.id;
    const sucesso = excluirItem('produtos.json', id);
    if (sucesso) {
        res.json({ status: 'sucesso' });
    } else {
        res.status(404).json({ status: 'erro', mensagem: 'Produto não encontrado' });
    }
});

app.post('/api/produtos/editar', (req, res) => {
    const id = req.body.id;
    const produto = req.body;

    try {
        const dados = lerDados('produtos.json');
        const index = dados.findIndex(item => item.id == id);
        if (index !== -1) {
            dados[index] = produto;
            fs.writeFileSync(path.join(__dirname,'data', 'produtos.json'), JSON.stringify(dados, null, 2));
            res.json({ status: 'sucesso' });
        } else {
            res.status(404).json({ status: 'erro', mensagem: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ status: 'erro', mensagem: 'Erro ao editar produto' });
    }
});


app.post('/api/produtos/buscar', (req, res) => {
    const id = req.body.id;
    try {
        const dados = lerDados('produtos.json');
        const produto = dados.find(item => item.id == id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar produto' });
    }
});


app.get('/api/consumidor', (req, res) => {
    const caminho = path.join(__dirname, 'data', 'consumidores.json');
    if (fs.existsSync(caminho)) {
        const conteudo = fs.readFileSync(caminho, 'utf-8');
        res.json(JSON.parse(conteudo));
    } else {
        res.json([]); // Retorna lista vazia se o arquivo não existir
    }
});

app.get('/api/produtos-filter', (req, res) => {
    const caminho = path.join(__dirname, 'data', 'produtos.json');
    if (fs.existsSync(caminho)) {
        const conteudo = fs.readFileSync(caminho, 'utf-8');
        res.json(JSON.parse(conteudo));
    } else {
        res.json([]); // Retorna lista vazia se o arquivo não existir
    }
});

app.get('/api/consumidor', (req, res) => {
    const caminho = path.join(__dirname, 'data', 'consumidores.json');
    if (fs.existsSync(caminho)) {
        const conteudo = fs.readFileSync(caminho, 'utf-8');
        res.json(JSON.parse(conteudo));
    } else {
        res.json([]); // Retorna lista vazia se o arquivo não existir
    }
});



app.get('/api/vendedor-filter', (req, res) => {
    const caminho = path.join(__dirname, 'data', 'vendedor.json');
    if (fs.existsSync(caminho)) {
        const conteudo = fs.readFileSync(caminho, 'utf-8');
        res.json(JSON.parse(conteudo));
    } else {
        res.json([]); // Retorna lista vazia se o arquivo não existir
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


