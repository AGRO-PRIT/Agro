var express = require('express');
var router = express.Router();
const path = require('path');
const autenticar = require('../models/autenticator-middleware');
const usuarioController = require('../controllers/usuariosController');

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


/* PERFIL*/  /* VENDEDOR!*/

router.get('/contaVendedor', function(req, res) {
    res.render('pages/Conta-vendedor/contaVendedor');
});

router.post('/contaVendedor', function(req, res) {
    res.redirect('/contaVendedor');
});


router.get('/avaliacoes', function(req, res) {
    res.render('pages/Conta-vendedor/avaliacoes'); 
});


router.get('/configuracoesV', function(req, res) {
    res.render('pages/Conta-vendedor/configuracoesV'); 
});


router.get('/produtosContaV', function(req, res) {
    res.render('pages/Conta-vendedor/produtosContaV'); 
});

router.get('/vendas', function(req, res) {
    res.render('pages/Conta-vendedor/vendas'); 
});

// vendas!

router.get('/concluido', function(req, res) {
    res.render('pages/Conta-vendedor/Status-vendas/concluido'); // Verifique o caminho correto
});

router.get('/emtransito', function(req, res) {
    res.render('pages/Conta-vendedor/Status-vendas/emtransito'); // Verifique o caminho correto
});
router.get('/enviarV', function(req, res) {
    res.render('pages/Conta-vendedor/Status-vendas/enviar'); // Verifique o caminho correto
});


/* CONSUMIDOR!*/

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
    res.render('pages/Conta-consumidor/Status-pedidos/pedidos'); 
});

router.get('/cartoes', function(req, res) {
    res.render('pages/Conta-consumidor/cartoes'); 
});

router.get('/enderecos', function(req, res) {
    res.render('pages/Conta-consumidor/enderecos'); 
});

router.get('/configuracoes', function(req, res) {
    res.render('pages/Conta-consumidor/configuracoes');
});

// pedidos

router.get('/aPagar', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/aPagar'); // Verifique o caminho correto
});

router.get('/cancelado', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/cancelado'); // Verifique o caminho correto
});
router.get('/emAndamento', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/emAndamento'); // Verifique o caminho correto
});
router.get('/tudo', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/tudo'); // Verifique o caminho correto
});

router.get('/finalizado', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/finalizado'); // Verifique o caminho correto
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

// carrinho

router.get('/finalizar-carrinho-endereco', function(req, res) {
    res.render('pages/finalizar-carrinho-endereco');
});

router.get('/finalizar-carrinho-cartao', function(req, res) {
    res.render('pages/finalizar-carrinho-cartao');
});

router.post('/finalizar-carrinho-endereco', function(req, res) {
    res.redirect('/finalizar-carrinho-endereco');
});

router.post('finalizar-carrinho-cartao', function(req, res) {
    res.redirect('finalizar-carrinho-cartao');
});

// ACTIONS BANCO USUARIO

// /* Rotas Públicas */
// router.get('/', (req, res) => res.render('pages/home'));
// router.get('/home', (req, res) => res.render('pages/home'));
// router.get('/login', (req, res) => res.render('pages/login'));
// router.get('/cadastre-se', (req, res) => res.render('pages/cadastre-se'));

// /* Rotas de Autenticação */
// router.post('/registrar', usuarioController.cadastrarUsuario); // Corrigido para usar cadastrarUsuario
// router.post('/login', usuarioController.login);

// /* Rotas Protegidas */
// router.get('/perfil', autenticar, usuarioController.obterPerfil);
// router.put('/atualizar', autenticar, usuarioController.atualizarUsuario);
// router.delete('/deletar', autenticar, usuarioController.excluirUsuario);
// // Rota de admin
// router.get('/listar', autenticar, usuarioController.listar);

module.exports = router;


