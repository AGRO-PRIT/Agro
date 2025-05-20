// app/middlewares/guestMiddleware.js
module.exports = (req, res, next) => {
  if (req.session.usuario) {
    // Se usuário já estiver logado, redireciona
    return res.redirect('/perfil'); 
  }
  // Se não estiver logado, continua
  next(); 
};