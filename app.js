const express = require('express');
const app = express();
const port = 3000;

//importar módulo mysql
// const mysql = require('');

//configuração de conexão
// const conexão = mysql.creatConnection({
//   host:'localhost:3306',
//   user:'root',
//   password:'@ITB123456',
//   database:''
// });

//teste de conexão
// conexão.connect(funtion(erro){
//   if(erro) throw erro;
//   console.log('Conexão efetuada com sucesso!');
// });

app.use(express.static('app/public'));

app.set('view engine', 'ejs');
app.set('views', './app/views');

//manipulação de dados via rotas
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//trabalhar com formulario
//app.use(express.urlencoded({ extended: false })); 

var rotas = require('./app/routes/router');
app.use('/', rotas);

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});
