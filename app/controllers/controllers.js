// Exemplo nodemail

// const sendEmail = require('../utils/emailService');

// const registerUser = async (req, res) => {
//     const { email } = req.body;

//     // Aqui viria a lógica de cadastro no banco

//     await sendEmail(email, 'Bem-vindo!', 'Obrigado por se cadastrar!');
//     res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
// };

// module.exports = { registerUser };




// const Todo = require('../models/todo');

// exports.getAllTodos = function(req, res) {
//     Todo.getAllTodos((err, todos) => {
//         if (err) throw err;
//         res.json(todos);
//     });
// };

// exports.getTodoById = function(req, res) {
//     Todo.getTodoById(req.params.id, (err, todo) => {
//         if (err) throw err;
//         res.json(todo);
//     });
// };

// exports.createTodo = function(req, res) {
//     const newTodo = {
//         title: req.body.title,
//         completed: req.body.completed
//     };

//     Todo.createTodo(newTodo, (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'Todo created successfully' });
//     });
// };

// exports.updateTodo = function(req, res) {
//     const updatedTodo = {
//         title: req.body.title,
//         completed: req.body.completed
//     };

//     Todo.updateTodo(req.params.id, updatedTodo, (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'Todo updated successfully' });
//     });
// };

// exports.deleteTodo = function(req, res) {
//     Todo.deleteTodo(req.params.id, (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'Todo deleted successfully' });
//     });
// };


// const Tutorial = require("../models/tutorial.model.js");

// // Create and Save a new Tutorial
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   // Create a Tutorial
//   const tutorial = new Tutorial({
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published || false
//   });

//   // Save Tutorial in the database
//   Tutorial.create(tutorial, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     else res.send(data);
//   });
// };

// // Retrieve all Tutorials from the database (with condition).
// exports.findAll = (req, res) => {
//   const title = req.query.title;

//   Tutorial.getAll(title, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Find a single Tutorial by Id
// exports.findOne = (req, res) => {
//   Tutorial.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Tutorial.updateById(
//     req.params.id,
//     new Tutorial(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Tutorial with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Tutorial with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   Tutorial.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Tutorial was deleted successfully!` });
//   });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };


// Get list of Users
// exports.index = function(req, res) {

//     // Define number to paginate
//     var from   = parseInt(req.query.from) || 0;
//     var to     = parseInt(req.query.to)   || 1;
  
//     // Create query and parameters
//     var query      = "SELECT * FROM users LIMIT ?";
//     var pagination = [from,to];
  
//     // Return user
//     mysql.exec(query, [pagination], function (err, user) {
//       if (err) { handleError(res, err, 500) };
//       res.json(user);
//     });
//   };
  
  
  
//   // Get one User
//   exports.show = function (req, res) {
  
//     // Define Query and parameters
//     var query   = "SELECT * FROM users WHERE id = ?";
//     var id      = req.params.id;
  
//     // Return One User
//     mysql.exec(query, [id], function (err, users) {
//       if (err) { handleError(res, err, 500) };
//       res.json(users);
//     });
//   }
  
  
  
//   // Create a User
//   exports.create = function (req, res) {
//     var user = req.body;
//     var now = utility.dateNow();
  
//     // Validate input fields
//     User.validate( user, 'post' , function (err) {
//       if (err) { handleError(res,err,400); return; };
  
//       // Define values to insert
//       var values = {
//         name:               user.name,
//         last_name:          user.last_name,
//         username:           user.username,
//         password:           user.password,
//         email:              user.email,
//         birthdate:          user.birthdate,
//         social_account_id:  user.social_account_id,
//         customers_id:       user.customers_id,
//         plan_id:            user.plan_id,
//         controllers_id:     user.controllers_id,
//         updated_at:         now,
//         created_at:         now
//       };
  
//       // Define Query
//       var query   = "INSERT INTO users SET ? ";
  
//       // Return One User
//       mysql.exec(query, values, function (err, data) {
//       if (err) { handleError(res, err, 500); return; };
  
//       if (data.affectedRows < 1) {
//         let error = { errors: [{
//           title: 'Can not insert User'
//         }]};
//         handleError(res, error, 400 ); return;
//       }
  
//       res.json({
//         id: data.insertId,
//         username: values.username,
//         password: values.password
//       });
//       });
//     });
//   }
  
  
  
//   // Update a User
//   exports.update = function (req, res) {
//     var user_new   = req.body;
//     var now        = utility.dateNow();
//     var error      = { errors: [] };
  
//     // User Id comes from URL
//     user_new.id = req.params.id;
  
//     User.validate( user_new ,'put',  function (err) {
//       if (err) { handleError(res,err,400); return; };
  
//       User.findById(user_new.id, function (err, user) {
//         if (err) { handleError(res,err,400); return; };
  
//         if (!user){
//           err = {
//             source: { parameter: 'id'},
//             title: 'User no found'
//           };
//           error.errors.push(err);
//           handleError(res,err,404); return;
//         }
  
//         // Define values to insert
//         var values = {
//           name:               user_new.name              || user.name,
//           last_name:          user_new.last_name         || user.last_name,
//           username:           user_new.username          || user.username,
//           password:           user_new.password          || user.password,
//           email:              user_new.email             || user.email,
//           birthdate:          user_new.birthdate         || user.birthdate ,
//           social_account_id:  user_new.social_account_id || user.social_account_id,
//           plan_id:            user_new.plan_id           || user.plan_id,
//           controllers_id:     user_new.controllers_id    || user.controllers_id,
//           updated_at:         now,
//           created_at:         now
//         }
  
//         // Define Query
//         var query   = "UPDATE users SET ? WHERE id = ? ";
  
//         // Return Query Status
//         mysql.exec(query, [values, user.id], function (err, data) {
//           if (err) { handleError(res, err, 500); };
//           if (data.affectedRows < 1) {
//             error.errors.push({ title: 'Can not insert Users' });
//             handleError(res, error, 400 ); return;
//           }
//           res.json( {success: true });
//         });
//       });
  
//     });
//   }
  
  
  
//   // Delete a User
//   exports.delete = function (req, res) {
//     var error = { errors: [] };
  
//     // SQL Query
//     var query = "DELETE FROM users WHERE id = ?";
  
//     // Return One User
//     mysql.exec(query, req.params.id , function (err, data) {
//       if (err) { handleError(res, err, 500); return; };
//       if (data.affectedRows < 1) {
//         error.errors.push({ title: 'Can not delete User' });
//         handleError(res, error, 400 ); return;
//       }
//       res.json( {success: true });
//     });
//   }
  
  
  
//   // Reponse with error and code
//   function handleError(res, err, code) {
//     if (code===500) {
//       err = "Internar Error";
//     }
//     res.status(code).send(err);
//   }

// var express = require('express');
// var router = express.Router();
// var dbConn  = require('../lib/db');
 
// // display user page
// router.get('/', function(req, res, next) {      
//     dbConn.query('SELECT * FROM users ORDER BY id desc',function(err,rows)     {
//         if(err) {
//             req.flash('error', err);
//             // render to views/users/index.ejs
//             res.render('users',{data:''});   
//         } else {
//             // render to views/users/index.ejs
//             res.render('users',{data:rows});
//         }
//     });
// });

// // display add user page
// router.get('/add', function(req, res, next) {    
//     // render to add.ejs
//     res.render('users/add', {
//         name: '',
//         email: '',
//         position:''
//     })
// })

// // add a new user
// router.post('/add', function(req, res, next) {    

//     let name = req.body.name;
//     let email = req.body.email;
//     let position = req.body.position;
//     let errors = false;

//     if(name.length === 0 || email.length === 0 || position === 0) {
//         errors = true;

//         // set flash message
//         req.flash('error', "Please enter name and email and position");
//         // render to add.ejs with flash message
//         res.render('users/add', {
//             name: name,
//             email: email,
//             position:position
//         })
//     }

//     // if no error
//     if(!errors) {

//         var form_data = {
//             name: name,
//             email: email,
//             position:position
//         }
        
//         // insert query
//         dbConn.query('INSERT INTO users SET ?', form_data, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 req.flash('error', err)
                 
//                 // render to add.ejs
//                 res.render('users/add', {
//                     name: form_data.name,
//                     email: form_data.email,
//                     position:form_data.position
//                 })
//             } else {                
//                 req.flash('success', 'User successfully added');
//                 res.redirect('/users');
//             }
//         })
//     }
// })

// // display edit user page
// router.get('/edit/(:id)', function(req, res, next) {

//     let id = req.params.id;
   
//     dbConn.query('SELECT * FROM users WHERE id = ' + id, function(err, rows, fields) {
//         if(err) throw err
         
//         // if user not found
//         if (rows.length <= 0) {
//             req.flash('error', 'User not found with id = ' + id)
//             res.redirect('/users')
//         }
//         // if user found
//         else {
//             // render to edit.ejs
//             res.render('users/edit', {
//                 title: 'Edit User', 
//                 id: rows[0].id,
//                 name: rows[0].name,
//                 email: rows[0].email,
//                 position: rows[0].position
//             })
//         }
//     })
// })

// // update user data
// router.post('/update/:id', function(req, res, next) {

//     let id = req.params.id;
//     let name = req.body.name;
//     let email = req.body.email;
//     let position = req.body.position;
//     let errors = false;

//     if(name.length === 0 || email.length === 0 || position.length === 0) {
//         errors = true;
        
//         // set flash message
//         req.flash('error', "Please enter name and email and position");
//         // render to add.ejs with flash message
//         res.render('users/edit', {
//             id: req.params.id,
//             name: name,
//             email: email,
//             position:position
//         })
//     }

//     // if no error
//     if( !errors ) {   
 
//         var form_data = {
//             name: name,
//             email: email,
//             position:position
//         }
//         // update query
//         dbConn.query('UPDATE users SET ? WHERE id = ' + id, form_data, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 // set flash message
//                 req.flash('error', err)
//                 // render to edit.ejs
//                 res.render('users/edit', {
//                     id: req.params.id,
//                     name: form_data.name,
//                     email: form_data.email,
//                     position: form_data.position
//                 })
//             } else {
//                 req.flash('success', 'User successfully updated');
//                 res.redirect('/users');
//             }
//         })
//     }
// })
   
// // delete user
// router.get('/delete/(:id)', function(req, res, next) {

//     let id = req.params.id;
     
//     dbConn.query('DELETE FROM users WHERE id = ' + id, function(err, result) {
//         //if(err) throw err
//         if (err) {
//             // set flash message
//             req.flash('error', err)
//             // redirect to user page
//             res.redirect('/users')
//         } else {
//             // set flash message
//             req.flash('success', 'User successfully deleted! ID = ' + id)
//             // redirect to user page
//             res.redirect('/users')
//         }
//     })
// })

// Routes
// router.get('/', todoController.getAllTodos);
// router.get('/:id', todoController.getTodoById);
// router.post('/', todoController.createTodo);
// router.put('/:id', todoController.updateTodo);
// router.delete('/:id', todoController.deleteTodo);

// Talvez podemos utilizar alguma coisa daqui: var express = require('express');
// var router = express.Router();

// // Listar produtos
// router.get('/', function (req, res, next) {
//     pool.getConnection(function (err, connection) {
//         connection.query("SELECT * FROM produtos", function (err, rows) {
//             if (!err && rows.length > 0) {
//                 res.json(rows);
//             } else {
//                 res.json([]);
//             }
//         });
//     });
// });

// // Buscar produto pelo id
// router.get('/:id', function (req, res, next) {
//     pool.getConnection(function (err, connection) {
//         var id = req.params.id;
//         connection.query("SELECT * FROM produtos WHERE id='"
//             + id + "' LIMIT 1", function (err, rows) {
//                 if (!err && rows.length > 0) {
//                     res.json(rows);
//                 } else {
//                     res.json([]);
//                 }
//             });
//     });
// });

// // Cadastrar produtos
// router.post('/', function (req, res, next) {
//     pool.getConnection(function (err, connection) {
//         var dados = req.body;
//         var nome = dados.nome;
//         var quant = dados.quant;

//         connection.query(
//             "INSERT INTO produtos (nome, quant) VALUES ('"
//             + nome + "','"
//             + quant +
//             "')", function (err, rows) {

//                 if (rows.affectedRows) {
//                     connection.query("SELECT * FROM produtos WHERE id='" + rows.insertId
//                         + "' LIMIT 1", function (err, rows) {
//                             if (!err && rows.length > 0) {
//                                 res.json(rows);
//                             } else {
//                                 res.json([]);
//                             }
//                         });
//                 }
//             });
//     });
// });

// // Excluir produto
// router.delete('/:id', function (req, res, next) {
//     pool.getConnection(function (err, connection) {
//         var id = req.params.id;
//         connection.query("DELETE FROM produtos WHERE id='" + id +
//             "'", function (err, rows) {
//                 if (!err) {
//                     res.json({
//                         "Excluído": true
//                     });
//                 } else {
//                     res.json([]);
//                 }
//             });
//     });
// });

// // Modificar produto
// router.put('/:id', function (req, res, next) {
//     pool.getConnection(function (err, connection) {
//         var dados = req.body;
//         var id = req.params.id;
//         var nome = dados.nome;
//         var quant = dados.quant;

//         connection.query(
//             "UPDATE produtos SET nome='" + nome +
//             "', quant='" + quant +
//             "'WHERE id='" + id +
//             "'", function (err, rows) {

//                 if (rows.affectedRows) {
//                     connection.query("SELECT * FROM produtos WHERE id='" + id
//                         + "' LIMIT 1", function (err, rows) {
//                             if (!err && rows.length > 0) {
//                                 res.json(rows[0]);
//                             } else {
//                                 res.json([]);
//                             }
//                         });
//                 }
//             });
//     });
// });