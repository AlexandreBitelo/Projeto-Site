function cadastrarDados (db) {
    //Cadastros de dados para testar tabela cadastros
    db.run (`INSERT INTO cadastros (nome_usuario, imagem_usuario, email, senha) VALUES ("Alexandre", "foto do Alexandre", "alexandre@gmail.com", "sadasdas")`);

    db.run (`INSERT INTO cadastros (nome_usuario, imagem_usuario, email, senha) VALUES ("paulo", "foto do Paulo", "paulo@gmail.com", "********")`);
    
    db.run (`INSERT INTO cadastros (nome_usuario, imagem_usuario, email, senha) VALUES ("Rafael", "foto do Rafael", "rafael@gmail.com", "**********")`);

    //Cadastros de dados para testar tabela locais
    db.run (`INSERT INTO locais (tipo_local, nome_local, imagem_local, cep, endereco, cidade, numero_local) VALUES ("Cafeteria", "Café tech", "imagem_Café_tech", "3215467", "Rua Jardim américa", "São Leopoldo", "51")`);

    db.run (`INSERT INTO locais (tipo_local, nome_local, imagem_local, cep, endereco, cidade, numero_local) VALUES ("Restaurante", "Los aventurairos", "imagem_aventureiros", "6112468", "Rua Atlântico", "Sapucaia", "60")`);

    db.run (`INSERT INTO locais (tipo_local, nome_local, imagem_local, cep, endereco, cidade, numero_local) VALUES ("Hotel", "Sleep Well", "imagem_sleep_well", "32145628", "Rua mascarenhas", "Porto Alegre", "45")`);

    //Cadastros  de dados para testar tabela avaliações
    db.run (`INSERT INTO avaliacoes (id_cadastro, numero_estrelas, mensagem, id_local) VALUES ("1", "2.5", "Cafeteria muito boa", "3")`);

};

module.exports = cadastrarDados;