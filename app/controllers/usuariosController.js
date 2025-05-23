// controllers/usuariosController.js
const UsuarioModel = require('../models/model-usuario');
const bcrypt = require('bcryptjs');

module.exports = {
  // Cadastrar novo usuário
  // Atualize o método cadastrarUsuarioNormal




cadastrarUsuarioNormal: async (req, res) => {
    try {
      const { nome_completo, email, senha } = req.body;
      
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
      const novoUsuario = await UsuarioModel.create({
        NomeCompleto: nome_completo,
        Email: email,
        Senha: senhaHash
      });
      
      // AUTOLOGIN: Criar sessão diretamente após cadastro
      req.session.usuario = {
        id: novoUsuario.insertId, // ID do novo usuário
        email: email,
        nome: nome_completo
      };
      
      // Redirecionar para contaConsumidor
      req.session.save(() => {
      res.redirect("/contaConsumidor");
      });
      
    } catch (e) {
      console.error(e);
      res.render("pages/cadastre-se", {
        dados: req.body,
        erros: [{ msg: "Erro ao cadastrar usuário. Tente novamente." }],
        sucesso: null
      });
    }
  },
  
  // Autenticar usuário (login)
// autenticarUsuario: async (req, res) => {
//     try {
//       const { email, senha } = req.body;
      
//       // Buscar usuário pelo email
//       const usuario = await UsuarioModel.buscarPorEmail(email);
      
//       if (!usuario) {
//         return res.render("pages/login", {
//           erro: "Email ou senha incorretos",
//           sucesso: null
//         });
//       }
      
//       // Verificar se a senha está correta
//       const senhaCorreta = await bcrypt.compare(senha, usuario.SenhaHash);
      
//       if (!senhaCorreta) {
//         return res.render("pages/login", {
//           erro: "Email ou senha incorretos",
//           sucesso: null
//         });
//       }
      
//       // Criar a sessão do usuário
//       req.session.usuario = {
//         id: usuario.id,
//         email: usuario.Email,
//         nome: usuario.NomeCompleto
//       };
      
//        res.redirect("/contaConsumidor");
//     } catch (error) {
//       console.error(error);
//       res.render("pages/login", {
//         erro: "Ocorreu um erro ao fazer login. Tente novamente.",
//         sucesso: null
//       });
//     }
//   },


autenticarUsuario: async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        const usuario = await UsuarioModel.buscarPorEmail(email);
        
        if (!usuario) {
            return res.render("pages/login", {
                erro: "Email ou senha incorretos",
                sucesso: null
            });
        }
        
        const senhaCorreta = await bcrypt.compare(senha, usuario.SenhaHash);
        
        if (!senhaCorreta) {
            return res.render("pages/login", {
                erro: "Email ou senha incorretos",
                sucesso: null
            });
        }

        // Se chegou aqui, login foi bem-sucedido
        req.session.usuario = {
            id: usuario.id,
            email: usuario.Email,
            nome: usuario.NomeCompleto
        };

        res.redirect("/contaConsumidor");

    } catch (error) {
        console.error("Erro no login:", error);
        res.render("pages/login", {
            erro: "Erro interno. Tente novamente mais tarde.",
            sucesso: null
        });
    }
},

  // Logout
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
};

// module.exports = usuariosController;


// // controllers/usuariosController.js
// const UsuarioModel = require("../models/model-usuario")
// const bcrypt = require("bcryptjs")
// const moment = require("moment")
// const { body, validationResult } = require("express-validator")

// const usuariosController = {
//   regrasValidacao: [
//     body("email").isEmail().withMessage("E-mail inválido!"),
//     body("nome_completo").isLength({ min: 5, max: 100 }).withMessage("Nome deve conter de 5 a 100 caracteres!"),
//     body("data_nascimento").isISO8601().withMessage("Data inválida! Use o formato AAAA-MM-DD"),
//     body("telefone").isLength({ min: 11, max: 15 }).withMessage("Telefone inválido!"),
//   ],

//   // Exibir formulário de cadastro
//   exibirFormCadastro: (req, res) => {
//     res.render("cadastre-se", {
//       dados: {},
//       erros: null,
//     })
//   },

//   // Cadastrar novo usuário
//   cadastrarUsuarioNormal: async (req, res) => {
//     const errors = validationResult(req)

//     if (!errors.isEmpty()) {
//       return res.render("cadastre-se", {
//         dados: req.body,
//         erros: errors.array(),
//       })
//     }

//     try {
//       const { nome_completo, email, senha } = req.body

//       // Verifica se email já existe
//       const usuarioExistente = await UsuarioModel.findByEmail(email)
//       if (usuarioExistente) {
//         return res.render("cadastre-se", {
//           dados: req.body,
//           erros: [{ msg: "Este email já está cadastrado" }],
//         })
//       }

//       // Hash da senha
//       const senhaHash = await bcrypt.hash(senha, 10)

//       // Cria o usuário
//       const novoUsuarioId = await UsuarioModel.create({
//         NomeCompleto: nome_completo,
//         Email: email,
//         Senha: senhaHash,
//       })

//       // Redireciona para login com mensagem de sucesso
//       req.flash("sucesso", "Cadastro realizado com sucesso! Faça login para continuar.")
//       res.redirect("/login")
//     } catch (e) {
//       console.error(e)
//       res.render("cadastre-se", {
//         dados: req.body,
//         erros: [{ msg: "Erro ao cadastrar usuário. Tente novamente." }],
//       })
//     }
//   },

//   // Autenticar usuário (login)
// autenticarUsuario: async (req, res) => {
//     try {
//         // Lógica de autenticação...
        
//         // Se houver erro
//         if (!usuario) {
//             return res.render("login", {
//                 erro: "Email ou senha incorretos",
//                 sucesso: null // Adicione isso para evitar erros
//             });
//         }
        
//         // Se a senha estiver incorreta
//         if (!senhaCorreta) {
//             return res.render("login", {
//                 erro: "Email ou senha incorretos",
//                 sucesso: null // Adicione isso para evitar erros
//             });
//         }
        
//         // Se for bem-sucedido
//         req.session.usuario = {
//             id: usuario.id,
//             email: usuario.Email,
//             nome: usuario.NomeCompleto
//         };
        
//         res.redirect("/contaConsumidor");
//     } catch (error) {
//         console.error(error);
//         res.render("login", {
//             erro: "Ocorreu um erro ao fazer login. Tente novamente.",
//             sucesso: null // Adicione isso para evitar erros
//         });
//     }
// },

//   // Logout
//   logout: (req, res) => {
//     req.session.destroy()
//     res.redirect("/login")
//   },
// }

// module.exports = usuariosController
