// Chamada da bliblioteca express
const express = require('express');

// Declaração do servidor
const srv = express();

// Chamada do módulo e criação do banco
const banco = require ('../Banco de Dados/configBanco');

// Declaração da porta do servidor 
srv.listen(3030, () => {console.log ("Conectado na porta 3030")});

// Chamada de confirmação com Google
require ('./auth');
const passport = require('passport');

const session = require('express-session');

srv.use (session({ secret: "cats" }))
srv.use(passport.initialize());
srv.use(passport.session());

srv.get ("/", (req, res) => {
    res.send(`<a href="/auth/google">Entrar com Google</a>`);
})

srv.get ("/auth/google", passport.authenticate('google', {scope: ["email", "profile", ] }))

srv.get ("/google/callback", 
    passport.authenticate("google", {
        successRedirect: "/protegido",
        failureRedirect: "/auth/falha",
    })
);

function estaLogado (req, res, next) {
    req.user ? next() : res.sendStatus (401); 
}

srv.get ("auth/falha", (req, res) => {
    res.send ("<h1>ops.. Algo deu errado</h1>")
})

srv.get ("/protegido", estaLogado, (req, res) => {
    res.send (`
    
    Olá! 👋 ${req.user.displayName}
    nb
    <a href="/logout">Sair</a>
    `);
})


srv.get("/logout", (req, res) => {
    //req.logout();
    req.session.destroy();
    res.send("Adeus...");
},)

