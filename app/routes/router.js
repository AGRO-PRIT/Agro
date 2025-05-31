

var express = require('express');
var router = express.Router();
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const autenticar = require('../models/autenticator-middleware');
const usuariosController = require("../controllers/usuariosController");
const vendedoresController = require("../controllers/vendedoresController")

// Middleware para verificar se o usuário está autenticado
function verificarAutenticacao(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  res.redirect("/login");
}
function verificarVendedor(req, res, next) {
    if (req.session.usuario && req.session.usuario.isVendedor) {
        return next();
    }
    res.redirect("/loginV");
}


// Middleware para adicionar usuário às variáveis locais
router.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

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

// REMOVIDO: Rota duplicada para /cadastre-se

router.get('/cadastre-seV', function(req, res) {
    res.render('pages/cadastre-seV');
});

// REMOVIDO: Rota duplicada para /login

router.get('/loginV', function(req, res) {
    res.render('pages/loginV');
});

// router.post('/loginV', function(req, res) {
//     res.redirect('/loginV');
// });

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
    res.render('pages/Conta-vendedor/Status-vendas/concluido');
});

router.get('/emtransito', function(req, res) {
    res.render('pages/Conta-vendedor/Status-vendas/emtransito');
});

router.get('/enviarV', function(req, res) {
    res.render('pages/Conta-vendedor/Status-vendas/enviar');
});

/* CONSUMIDOR!*/
router.get('/contaEscolha', function(req, res) {
    res.render('pages/contaEscolha');
});

router.get('/detalhesVendedor', function(req, res) {
    res.render('pages/detalhesVendedor');
});

// REMOVIDO: Rota duplicada para /contaConsumidor

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
    res.render('pages/Conta-consumidor/Status-pedidos/aPagar');
});

router.get('/cancelado', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/cancelado');
});

router.get('/emAndamento', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/emAndamento');
});

router.get('/tudo', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/tudo');
});

router.get('/finalizado', function(req, res) {
    res.render('pages/Conta-consumidor/Status-pedidos/finalizado');
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

// CORRIGIDO: Adicionada a barra no início do caminho
router.post('/finalizar-carrinho-cartao', function(req, res) {
    res.redirect('/finalizar-carrinho-cartao');
});

// Rotas de autenticação (mantidas apenas uma vez)
router.get('/cadastre-se', guestMiddleware, (req, res) => {
  res.render("pages/cadastre-se", {
  dados: null,
  erro: null
});


});

router.post('/cadastrarVendedor', vendedoresController.cadastrarVendedor);

router.post('/cadastrar', usuariosController.cadastrarUsuarioNormal); // Sem autologin

router.get("/login", (req, res) => {
    res.render("pages/login", {
        erro: null,
        sucesso: req.flash('sucesso') // Adiciona esta linha para mostrar mensagens de sucesso
    });
});

// router.get("/login", (req, res) => {
//     res.render("pages/login", {
//         erro: null, // Inicializa sem erro
//         sucesso: null
//     });
// });

router.post("/login", usuariosController.autenticarUsuario);

// Rota de perfil (protegida)
router.get("/contaConsumidor", verificarAutenticacao, (req, res) => {
  res.render("pages/Conta-consumidor/contaConsumidor", { usuario: req.session.usuario });
});

router.post("/contaConsumidor", verificarAutenticacao, (req, res) => {
  res.redirect("/contaConsumidor");
});

// Rota de logout
router.get("/logout", usuariosController.logout);
router.post("/logout", usuariosController.logout);



router.get('/loginV', (req, res) => {
    res.render("pages/loginV", {
        erro: null,
        sucesso: req.flash('sucesso') || null
    });
});

router.post('/loginV', vendedoresController.autenticarVendedor);

router.get('/cadastre-seV', (req, res) => {
    res.render("pages/cadastre-seV", {
        dados: {},
        erros: null,
        sucesso: null
    });
});

router.get("/contaVendedor", verificarVendedor, (req, res) => {
    res.render("pages/Conta-vendedor/contaVendedor");
});


router.post('/cadastrarVendedor', vendedoresController.cadastrarVendedor);

// Proteja a rota contaVendedor
// router.get("/contaVendedor", (req, res) => {
//     if (!req.session.usuario || !req.session.usuario.isVendedor) {
//         return res.redirect("/loginV");
//     }
//     res.render("pages/Conta-vendedor/contaVendedor", { 
//         usuario: req.session.usuario 
//     });
// });




module.exports = router;