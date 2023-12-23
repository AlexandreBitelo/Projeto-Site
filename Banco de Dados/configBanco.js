// Chamada do módulo sqlite3
const sqlite3 = require ('../Lógica/node_modules/sqlite3/lib/sqlite3');

// Função para verificar se há falha ao conectar com banco de dados
function erro (falha) {
    if (falha) console.log ("Algo deu errado... " + falha);

    console.log ("Conexão bem sucedida!");
};

// Função para criar banco de dados 
function criarBanco (db, nomeDoBanco) {
    db = new sqlite3.Database (`../Banco de Dados/${nomeDoBanco}.db`, erro);

    // Criação da tabela cadastros 
    db.run (`CREATE TABLE IF NOT EXISTS cadastros (id_cadastro INTEGER PRIMARY KEY , nome_usuario STRING, imagem_usuario, email STRING, senha STRING)`);

    // Criação da tabela locais
    db.run (`CREATE TABLE IF NOT EXISTS locais (id_local INTEGER PRIMARY KEY, tipo_local STRING, nome_local STRING, imagem_local STRING, cep NUMBER, endereco STRING, cidade STRING, numero_local NUMBER)`);

    // Criação da tabela avaliações com chave estrangeira para tabela locais e cadastos
    db.run (`CREATE TABLE IF NOT EXISTS avaliacoes (id_avaliacao INTEGER PRIMARY KEY, id_cadastro NUMBER NOT NULL, numero_estrelas NUMBER, mensagem STRING, id_local NUMBER NOT NULL, FOREIGN KEY (id_cadastro) REFERENCES cadastros(id_cadastro), FOREIGN KEY (id_local) REFERENCES locais(id_local))`);

    return db;
};

// Novas Funções para o banco
function novasFuncoesBanco (bancoNovo) {
    bancoNovo.info = function () {
        console.log (`
        Informar em CADASTAR (nome_usuario, imagem_usuario, email, senha);
        ---------------------------
        Informar em LOCAIS (tipo_local, nome_local, imagem_local, cep, endereco, cidade, numero_local);
        ---------------------------
        Informar em AVALIAÇÕES (id_cadastro, numero_estrelas, mensagem, id_local)

        `);
        
    },

    bancoNovo.cadastrarEmCadastros = function (nome_usuario, imagem_usuario, email, senha) {
        const sql = (`INSERT INTO cadastros (nome_usuario, imagem_usuario, email, senha) VALUES (?,?,?,?)`);

        bancoNovo.run (sql, [nome_usuario, imagem_usuario, email, senha]);
    
    };

    bancoNovo.cadastrarEmLocais = function (tipo_local, nome_local, imagem_local, cep, endereco, cidade, numero_local) {
        const sql = `INSERT INTO locais (tipo_local, nome_local, imagem_local, cep, endereco, cidade, numero_local) VALUES (?,?,?,?,?,?,?)`;

        bancoNovo.run (sql, [tipo_local, nome_local, imagem_local, cep, endereco, cidade, numero_local]);

    };

    bancoNovo.cadastrarEmAvaliacoes = function (id_cadastro, numero_estrelas, mensagem, id_local) {
        const sql = (`INSERT INTO avaliacoes (id_cadastro, numero_estrelas, mensagem, id_local) VALUES (?,?,?,?)`);
        bancoNovo.run (sql, [id_cadastro, numero_estrelas, mensagem, id_local])
        
    };

    return bancoNovo;
}
            
// Declaração do banco de dados
let banco; 
banco = criarBanco(banco, "Banco de Dados");   

// Atribuindo novas funções para o banco
banco = novasFuncoesBanco(banco);

// Exportando banco
module.exports = banco;