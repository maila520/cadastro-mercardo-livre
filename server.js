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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
