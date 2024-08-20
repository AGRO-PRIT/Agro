var express = require('express');
var router = express.Router();

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

router.get('/contaConsumidor', function(req, res) {
    res.render('pages/contaConsumidor');
});

router.get('/login', function(req, res) {
    res.render('pages/login');
});

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


module.exports = router;