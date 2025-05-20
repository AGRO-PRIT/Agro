// middlewares/auth.js
var pool = require("../../config/pool-conexoes");
const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensagem: 'Token inválido' });
  }
}

module.exports = autenticar;