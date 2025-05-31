
// controllers/vendedoresController.js
const UsuarioModel = require('../models/model-usuario');
const ClienteModel = require('../models/model-cliente');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');

module.exports = {
  // Regras de validação para o formulário
  regrasValidacao: [
    body('email').isEmail().withMessage('E-mail inválido!'),
    body('nome_completo')
      .isLength({ min: 5, max: 100 })
      .withMessage('Nome deve conter de 5 a 100 caracteres!'),
    body('senha')
      .isLength({ min: 6 })
      .withMessage('A senha deve ter pelo menos 6 caracteres!'),
    body('cnpj')
      .notEmpty()
      .withMessage('CNPJ é obrigatório para vendedores')
  ],

  // Cadastrar novo vendedor
  cadastrarCliente: async (req, res) => {
    try {

      const { nome_completo, email, senha, cpf } = req.body;

      // Validar os dados de entrada
      // const errors = validationResult(req);

      // if (!errors.isEmpty()) {
      //   return res.render("pages/cadastre-seV", {
      //     dados: req.body,
      //     erros: errors.array(),
      //     sucesso: null
      //   });
      // }

      // Validação adicional do nome completo
      if (!nome_completo || nome_completo.trim().split(' ').length < 2) {
        return res.render("pages/cadastre-se", {
          dados: req.body,
          erros: [{ msg: "Por favor, insira seu nome completo (nome e sobrenome)." }],
          sucesso: null
        });
      }
      
      // Verificar se email já existe
      const usuarioExistente = await UsuarioModel.findByEmail(email);
      if (usuarioExistente) {
        return res.render("pages/cadastre-se", {
          dados: req.body,
          erros: [{ msg: "Este email já está cadastrado" }],
          sucesso: null
        });
      }
      
      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, 10);
      
      // Criar o usuário
      const usuarioId = await UsuarioModel.create({
        NomeCompleto: nome_completo,
        Email: email,
        Senha: senhaHash
      });
      

       if (!usuarioId) {
        throw new Error("Falha ao criar usuário");
      }

      // Criar o cliente (apenas com CPF)
      await ClienteModel.create({
        UsuarioId: usuarioId,
        CPF: cpf
      });
      
      req.flash('sucesso', 'Cadastro de vendedor realizado com sucesso! Faça login para continuar.');
      res.redirect("/login");
      return res.redirect("/login");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      return res.render("pages/cadastre-se", {
        dados: req.body,
        erros: [{ msg: "Erro ao cadastrar cliente. Tente novamente." }],
        sucesso: null
      });
    }
  },

  // Autenticar vendedor
  autenticarCliente: async (req, res) => {
    try {
      const { email, senha } = req.body;
      
      // Validação básica dos campos
      if (!email || !senha) {
        return res.render("pages/login", {
          erro: "Email e senha são obrigatórios",
          sucesso: null
        });
      }
      
      // Buscar usuário
      const usuario = await UsuarioModel.buscarPorEmail(email);
      
      if (!usuario) {
        return res.render("pages/login", {
          erro: "Email ou senha incorretos",
          sucesso: null
        });
      }
      
      // Verificar senha
      const senhaCorreta = await bcrypt.compare(senha, usuario.SenhaHash);
      
      if (!senhaCorreta) {
        return res.render("pages/login", {
          erro: "Email ou senha incorretos",
          sucesso: null
        });
      }

      // Verificar se é vendedor
      const cliente = await ClienteModel.buscarPorUsuarioId(usuario.id);
      
      if (!cliente) {
        return res.render("pages/login", {
          erro: "Esta conta não está cadastrada como cliente",
          sucesso: null
        });
      }

      // Criar sessão
      req.session.usuario = {
        id: usuario.id,
        email: usuario.Email,
        nome: usuario.NomeCompleto,
        isCliente: true,
        clienteId: cliente.id
      };

      // Redirecionar para conta do cliente
      return res.redirect("/contaConsumidor");
    } catch (error) {
      console.error("Erro no login:", error);
      res.render("pages/login", {
        erro: "Erro interno. Tente novamente mais tarde.",
        sucesso: null
      });
    }
  }
};