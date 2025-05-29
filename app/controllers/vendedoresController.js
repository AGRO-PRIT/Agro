// // controllers/vendedoresController.js
// const UsuarioModel = require('../models/model-usuario');
// const VendedorModel = require('../models/model-vendedor'); // Você precisará criar este modelo
// const bcrypt = require('bcryptjs');

// module.exports = {
//   // Cadastrar novo vendedor
//   cadastrarVendedor: async (req, res) => {
//     try {
//       const { nome_completo, email, senha, cnpj } = req.body;
      
//       // Verificar se email já existe
//       const usuarioExistente = await UsuarioModel.findByEmail(email);
//       if (usuarioExistente) {
//         return res.render("pages/cadastre-seV", {
//           dados: req.body,
//           erros: [{ msg: "Este email já está cadastrado" }],
//           sucesso: null
//         });
//       }
      
//       // Validações adicionais (CNPJ, CPF, etc.)
      
//       // Hash da senha
//       const senhaHash = await bcrypt.hash(senha, 10);
      
//       // Criar o usuário primeiro
//       const usuarioId = await UsuarioModel.create({
//         NomeCompleto: nome_completo,
//         Email: email,
//         Senha: senhaHash
//       });
      
//       // Depois criar o vendedor
//       await VendedorModel.create({
//         UsuarioId: usuarioId,
//         CNPJ: cnpj
//       });
      
//       // Redirecionar para loginV com mensagem de sucesso
//       req.flash('sucesso', 'Cadastro de vendedor realizado com sucesso! Faça login para continuar.');
//       res.redirect("/loginV");
//     } catch (e) {
//       console.error(e);
//       res.render("pages/cadastre-seV", {
//         dados: req.body,
//         erros: [{ msg: "Erro ao cadastrar vendedor. Tente novamente." }],
//         sucesso: null
//       });
//     }
//   },

//   // Autenticar vendedor
//   autenticarVendedor: async (req, res) => {
//     try {
//       const { email, senha } = req.body;
      
//       // Buscar usuário
//       const usuario = await UsuarioModel.buscarPorEmail(email);
      
//       if (!usuario) {
//         return res.render("pages/loginV", {
//           erro: "Email ou senha incorretos",
//           sucesso: null
//         });
//       }
      
//       // Verificar senha
//       const senhaCorreta = await bcrypt.compare(senha, usuario.SenhaHash);
      
//       if (!senhaCorreta) {
//         return res.render("pages/loginV", {
//           erro: "Email ou senha incorretos",
//           sucesso: null
//         });
//       }

//       // Verificar se é vendedor
//       const vendedor = await VendedorModel.buscarPorUsuarioId(usuario.id);
      
//       if (!vendedor) {
//         return res.render("pages/loginV", {
//           erro: "Esta conta não está cadastrada como vendedor",
//           sucesso: null
//         });
//       }

//       // Se tudo ok, criar sessão
//       req.session.usuario = {
//         id: usuario.id,
//         email: usuario.Email,
//         nome: usuario.NomeCompleto,
//         isVendedor: true, // Flag para identificar vendedor
//         vendedorId: vendedor.id // ID na tabela Vendedores
//       };

//       res.redirect("/contaVendedor");
//     } catch (error) {
//       console.error("Erro no login:", error);
//       res.render("pages/loginV", {
//         erro: "Erro interno. Tente novamente mais tarde.",
//         sucesso: null
//       });
//     }
//   }
// };


// controllers/vendedoresController.js
const UsuarioModel = require('../models/model-usuario');
const VendedorModel = require('../models/model-vendedor');
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
  cadastrarVendedor: async (req, res) => {
    try {

      const { nome_completo, email, senha, cnpj } = req.body;

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
        return res.render("pages/cadastre-seV", {
          dados: req.body,
          erros: [{ msg: "Por favor, insira seu nome completo (nome e sobrenome)." }],
          sucesso: null
        });
      }
      
      // Verificar se email já existe
      const usuarioExistente = await UsuarioModel.findByEmail(email);
      if (usuarioExistente) {
        return res.render("pages/cadastre-seV", {
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

      // Criar o vendedor (apenas com CNPJ)
      await VendedorModel.create({
        UsuarioId: usuarioId,
        CNPJ: cnpj
      });
      
      // Redirecionar para login com mensagem de sucesso
      req.flash('sucesso', 'Cadastro de vendedor realizado com sucesso! Faça login para continuar.');
      res.redirect("/loginV");
      return res.redirect("/loginV");
    } catch (error) {
      console.error("Erro ao cadastrar vendedor:", error);
      return res.render("pages/cadastre-seV", {
        dados: req.body,
        erros: [{ msg: "Erro ao cadastrar vendedor. Tente novamente." }],
        sucesso: null
      });
    }
  },

  // Autenticar vendedor
  autenticarVendedor: async (req, res) => {
    try {
      const { email, senha } = req.body;
      
      // Validação básica dos campos
      if (!email || !senha) {
        return res.render("pages/loginV", {
          erro: "Email e senha são obrigatórios",
          sucesso: null
        });
      }
      
      // Buscar usuário
      const usuario = await UsuarioModel.buscarPorEmail(email);
      
      if (!usuario) {
        return res.render("pages/loginV", {
          erro: "Email ou senha incorretos",
          sucesso: null
        });
      }
      
      // Verificar senha
      const senhaCorreta = await bcrypt.compare(senha, usuario.SenhaHash);
      
      if (!senhaCorreta) {
        return res.render("pages/loginV", {
          erro: "Email ou senha incorretos",
          sucesso: null
        });
      }

      // Verificar se é vendedor
      const vendedor = await VendedorModel.buscarPorUsuarioId(usuario.id);
      
      if (!vendedor) {
        return res.render("pages/loginV", {
          erro: "Esta conta não está cadastrada como vendedor",
          sucesso: null
        });
      }

      // Criar sessão
      req.session.usuario = {
        id: usuario.id,
        email: usuario.Email,
        nome: usuario.NomeCompleto,
        isVendedor: true,
        vendedorId: vendedor.id
      };

      // Redirecionar para conta do vendedor
      return res.redirect("/contaVendedor");
    } catch (error) {
      console.error("Erro no login:", error);
      res.render("pages/loginV", {
        erro: "Erro interno. Tente novamente mais tarde.",
        sucesso: null
      });
    }
  }
};