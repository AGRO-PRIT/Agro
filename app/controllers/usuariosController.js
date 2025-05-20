// controllers/usuariosController.js
const UsuarioModel  = require('../models/model-usuario');
const bcrypt = require('bcryptjs');
const moment = require("moment");
const { body, validationResult } = require("express-validator");

const usuariosController = {
    regrasValidacao: [
      body("email")
        .isEmail()
        .withMessage("E-mail inválido!"),
      body("nome_completo")
        .isLength({ min: 5, max: 100 })
        .withMessage("Nome deve conter de 5 a 100 caracteres!"),
      body("data_nascimento")
        .isISO8601()
        .withMessage("Data inválida! Use o formato AAAA-MM-DD"),
      body("telefone")
        .isLength({ min: 11, max: 15 })
        .withMessage("Telefone inválido!")
    ],
  
    // Listar todos os usuários (com paginação)
    listarUsuarios: async (req, res) => {
      res.locals.moment = moment; // Disponibiliza moment para as views
      
      try {
        let pagina = req.query.pagina || 1;
        const limite = 10;
        const offset = (pagina - 1) * limite;
  
        const { usuarios, total } = await UsuarioModel.listarComPaginacao(offset, limite);
        const totalPaginas = Math.ceil(total / limite);
  
        res.render("usuarios/listar", {
          usuarios,
          paginacao: {
            paginaAtual: pagina,
            totalPaginas
          }
        });
      } catch (e) {
        console.error(e);
        res.render("erro", { mensagem: "Falha ao carregar usuários" });
      }
    },
  
    // Formulário de cadastro
    exibirFormCadastro: (req, res) => {
      res.render("usuarios/cadastrar", { 
        dados: {}, 
        listaErros: null 
      });
    },

    cadastrarUsuarioNormal: async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.render("cadastre-se", {  // Supondo que sua view se chame 'cadastre-se.ejs'
            dados: req.body,
            erros: errors.array()
        });
    }

    try {
        const { nome_completo, data_nascimento, telefone, email, senha } = req.body;
        
        // Verifica se email já existe
        const usuarioExistente = await UsuarioModel.findByEmail(email);
        if (usuarioExistente) {
            return res.render("cadastre-se", {
                dados: req.body,
                erros: [{ msg: "Este email já está cadastrado" }]
            });
        }

        // Hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Cria o usuário
        const novoUsuarioId = await UsuarioModel.create({
            NomeCompleto: nome_completo,
            DataNascimento: data_nascimento,
            Telefone: telefone,
            Email: email,
            senha: senhaHash  // Note que seu model parece usar 'senha' em vez de 'Senha'
        });

        // Redireciona para login com mensagem de sucesso
        req.flash('sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
        res.redirect("/login");
    } catch (e) {
        console.error(e);
        res.render("cadastre-se", {
            dados: req.body,
            erros: [{ msg: "Erro ao cadastrar usuário. Tente novamente." }]
        });
    }
    },
  
    // // Cadastrar novo usuário
    // cadastrarUsuario: async (req, res) => {
    //   const errors = validationResult(req);
      
    //   if (!errors.isEmpty()) {
    //     return res.render("usuarios/cadastrar", {
    //       dados: req.body,
    //       listaErros: errors.array()
    //     });
    //   }
  
    //   try {
    //     const { email, nome_completo, data_nascimento, telefone, senha } = req.body;
        
    //     // Hash da senha
    //     const senhaHash = await bcrypt.hash(senha, 10);
  
    //     await UsuarioModel.criar({
    //       email,
    //       nome_completo,
    //       data_nascimento,
    //       telefone,
    //       senha: senhaHash
    //     });
  
    //     req.flash('sucesso', 'Usuário cadastrado com sucesso!');
    //     res.redirect("/usuarios");
    //   } catch (e) {
    //     console.error(e);
    //     res.render("usuarios/cadastrar", {
    //       dados: req.body,
    //       listaErros: [{ msg: "Erro ao cadastrar usuário" }]
    //     });
    //   }
    // },
  
    // Formulário de edição
    exibirFormEdicao: async (req, res) => {
      try {
        const usuario = await UsuarioModel.findId(req.params.id);
        
        if (!usuario) {
          return res.redirect("/usuarios");
        }
  
        res.render("usuarios/editar", {
          dados: usuario,
          listaErros: null
        });
      } catch (e) {
        console.error(e);
        res.redirect("/usuarios");
      }
    },
  
    // Atualizar usuário
    atualizarUsuario: async (req, res) => {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.render("usuarios/editar", {
          dados: { ...req.body, id: req.params.id },
          listaErros: errors.array()
        });
      }
  
      try {
        await UsuarioModel.atualizar(req.params.id, req.body);
        req.flash('sucesso', 'Usuário atualizado com sucesso!');
        res.redirect("/usuarios");
      } catch (e) {
        console.error(e);
        res.render("usuarios/editar", {
          dados: { ...req.body, id: req.params.id },
          listaErros: [{ msg: "Erro ao atualizar usuário" }]
        });
      }
    },
  
    // Excluir usuário
    excluirUsuario: async (req, res) => {
      try {
        await UsuarioModel.excluir(req.params.id);
        req.flash('sucesso', 'Usuário excluído com sucesso!');
      } catch (e) {
        console.error(e);
        req.flash('erro', 'Falha ao excluir usuário');
      }
      
      res.redirect("/usuarios");
    },


    
logout: (req, res) => {
  req.session.destroy();
  res.redirect('/login');
},

    login: async (req, res) => {
      try {
          const { email, senha } = req.body;
          const usuario = await UsuarioModel.buscarPorEmail(email);
          
          if (!usuario) {
              return res.render('pages/login', { erro: "Credenciais inválidas" });
          }
  
          const senhaValida = await bcrypt.compare(senha, usuario.senha);
          if (!senhaValida) {
              return res.render('pages/login', { erro: "Credenciais inválidas" });
          }
  
          req.session.usuario = usuario;
          res.redirect('/perfil');
      } catch (error) {
          console.error(error);
          res.render('pages/login', { erro: "Erro no servidor" });
      }
  }
  };
  
  module.exports = usuariosController;