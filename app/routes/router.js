var express = require('express');
var router = express.Router();


/* TESTES*/
router.get('/testes', function(req, res) {
    res.render('pages/testes');
});

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

router.get('/loginV', function(req, res) {
    res.render('pages/loginV');
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


/* BOX */

router.get('/faca-box', function(req, res) {
    res.render('pages/faca-box');
});


/* menudropDown */

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
    res.render('pages/contaConsumidor');
});
module.exports = router;