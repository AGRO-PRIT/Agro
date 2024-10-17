var express = require('express');
var router = express.Router();
const path = require('path');

// Rota para servir o arquivo JavaScript
router.get('/js/menuMobile.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/public/js/menuMobile.js'));
});


/* Pagina TESTES*/

router.get('/testes', function(req, res) {
    res.render('pages/testes');
});

/* Pagina Nav*/

router.get('/', function(req, res) {
    res.render('pages/home');
});

router.get('/carrinho', function(req, res) {
    res.render('pages/carrinho');
});

/* subnav */

router.get('/home', function(req, res) {
    res.render('pages/home');
});

router.get('/cadastre-se', function(req, res) {
    res.render('pages/cadastre-se');
});

router.get('/cadastre-seV', function(req, res) {
    res.render('pages/cadastre-seV');
});

router.get('/login', function(req, res) {
    res.render('pages/login');
});

router.post('/login', function(req, res) {
    res.redirect('/login');
});

router.get('/loginV', function(req, res) {
    res.render('pages/loginV');
});

router.post('/loginV', function(req, res) {
    res.redirect('/loginV');
});


/* menudropDown */


router.get('/produtos', function(req, res) {
    res.render('pages/produtos');
});

router.get('/box', function(req, res) {
    res.render('pages/box');
});

router.get('/premium', function(req, res) {
    res.render('pages/premium');
    
});

router.get('/eventos', function(req, res) {
    res.render('pages/eventos');
});

router.get('/evento1', function(req, res) {
    res.render('pages/evento1');
});

router.get('/evento2', function(req, res) {
    res.render('pages/evento2');
});


/* BOX */

router.get('/faca-box', function(req, res) {
    res.render('pages/faca-box');
});

router.get('/faca-box2', function(req, res) {
    res.render('pages/faca-box2');
});

router.get('/faca-box3', function(req, res) {
    res.render('pages/faca-box3');
});

router.get('/faca-box4', function(req, res) {
    res.render('pages/faca-box4');
});

/* menudropDown sub */

router.get('/legumes', function(req, res) {
    res.render('pages/legumes');
});

router.get('/verduras', function(req, res) {
    res.render('pages/verduras');
});

router.get('/frutas', function(req, res) {
    res.render('pages/frutas');
});

router.get('/cereais', function(req, res) {
    res.render('pages/cereais');
});

router.get('/laticionios', function(req, res) {
    res.render('pages/laticionios');
});

router.get('/suplemetos', function(req, res) {
    res.render('pages/suplemetos');
});

router.get('/graos', function(req, res) {
    res.render('pages/graos');
});

router.get('/chas', function(req, res) {
    res.render('pages/chas');
});

router.get('/proteinas', function(req, res) {
    res.render('pages/proteinas');
});


/* PERFIL*/

router.get('/contaVendedor', function(req, res) {
    res.render('pages/contaVendedor');
});



router.get('/contaEscolha', function(req, res) {
    res.render('pages/contaEscolha');
});

router.get('/detalhesVendedor', function(req, res) {
    res.render('pages/detalhesVendedor');
});


router.get('/contaConsumidor', function(req, res) {
    res.render('pages/Conta-consumidor/contaConsumidor');
});

router.post('/contaConsumidor', function(req, res) {
    res.redirect('/contaConsumidor');
});

router.get('/pedidos', function(req, res) {
    res.render('pages/Conta-consumidor/pedidos'); // Verifique o caminho correto
});

router.get('/cartoes', function(req, res) {
    res.render('pages/Conta-consumidor/cartoes'); // Verifique o caminho correto
});

router.get('/enderecos', function(req, res) {
    res.render('pages/Conta-consumidor/enderecos'); // Verifique o caminho correto
});

router.get('/configuracoes', function(req, res) {
    res.render('pages/Conta-consumidor/configuracoes'); // Verifique o caminho correto
});


/* Produto */

router.get('/produto', function(req, res) {
    res.render('pages/produto');
});

/* Evento */

router.get('/evento', function(req, res) {
    res.render('pages/evento');
});

/* Sobre Nós */

router.get('/sobre', function(req, res) {
    res.render('pages/sobre');
});

/* Vendedor Perfil para ver*/

router.get('/vendedor', function(req, res) {
    res.render('pages/vendedor');
});

module.exports = router;

