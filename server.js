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

// Função genérica para salvar dados
function salvarDados(nomeArquivo, novoRegistro) {
    const caminho = path.join(__dirname, 'data', nomeArquivo);
    const dados = fs.existsSync(caminho) ? JSON.parse(fs.readFileSync(caminho)) : [];
    dados.push(novoRegistro);
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

// Rotas
app.post('/api/consumidor', (req, res) => {
    salvarDados('consumidores.json', req.body);
    res.json({ status: 'sucesso' });
});

app.post('/api/vendedor', (req, res) => {
    salvarDados('vendedor.json', req.body);
    res.json({ status: 'sucesso' });
});

app.post('/api/produto', (req, res) => {
    salvarDados('produtos.json', req.body);
    res.json({ status: 'sucesso' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
