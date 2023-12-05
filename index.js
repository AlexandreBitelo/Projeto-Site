// Chamada da bliblioteca sqlite3
const sqlite3 = require('sqlite3');

// Chamada da bliblioteca express
const express = require('express');

// Declaração do servidor
const srv = express();

// Declaração da porta do servidor 
srv.listen(3030, () => {console.log ("Conectado na porta 3030")});

// Criação do banco de dados
const db = new sqlite3.Database ("./bancoDeDados.db", erro);

// Função para verificar se há falha ao conectar com banco de dados
function erro (falha) {
    if (falha) console.log ("Algo deu errado... " + falha);

    console.log ("Conexão bem sucedida!");
};

// Criação da tabela cadastros 
db.run (`CREATE TABLE IF NOT EXISTS cadastros (id_cadastro INTEGER PRIMARY KEY , nome_usuario STRING, imagem_usuario, email STRING, senha STRING, telefone NUMBER)`)

// Criação da tabela locais
db.run (`CREATE TABLE IF NOT EXISTS locais (id_local INTEGER PRIMARY KEY, tipo_local STRING, nome_local STRING, imagem_local STRING, cep NUMBER, endereco STRING, cidade STRING, numero_local NUMBER)`);

// Criação da tabela avaliações com chave estrangeira para tabela locais e cadastos
db.run (`CREATE TABLE IF NOT EXISTS avaliacoes (id_avaliacao INTEGER PRIMARY KEY, id_cadastro NUMBER NOT NULL, numero_estrelas NUMBER, mensagem STRING, id_local NUMBER NOT NULL, FOREIGN KEY (id_cadastro) REFERENCES cadastros(id_cadastro), FOREIGN KEY (id_local) REFERENCES locais(id_local))`);


srv.get ("/", (req, res) => {
    res.send(`<a href="/auth/google">Entrar com Google</a>`);
})

srv.get ("/protegido", (req, res) => {
    res.send ("Olá! 👋");
})







