var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/perfil');
});

router.get('/', function(req, res) {
    res.render('pages/carrinho');
});

/* subnav */

router.get('/', function(req, res) {
    res.render('pages/home');
});

router.get('/', function(req, res) {
    res.render('pages/produtos');
});

router.get('/', function(req, res) {
    res.render('pages/box');
});

router.get('/', function(req, res) {
    res.render('pages/premium');
});

router.get('/', function(req, res) {
    res.render('pages/eventos');
});


module.exports = router;