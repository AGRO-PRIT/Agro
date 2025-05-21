// app/middlewares/guestMiddleware.js
module.exports = (req, res, next) => {
  // Verificar se req.session existe antes de tentar acessar usuario
  if (req.session && req.session.usuario) {
    // Se o usuário já está logado, redireciona para a página de perfil
    return res.redirect('/contaConsumidor');
  }
  
  // Se o usuário não está logado, continua para a próxima rota
  next();
};