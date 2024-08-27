const express = require('express');
const app = express();
const port = 3000;
const { check, validationResult } = require('express-validator');

app.use(express.static('app/public'));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var rotas = require('./app/routes/router');
app.use('/', rotas);

app.post('/login'[
    check('email', "Email length error").idEmail().isLength({ min: 10, max: 30 }),
    check('password', "password length 9-10").isLength({min: 8, max: 10})

], (req, res) => {
    const sql = "SELECT * FROM login WHERE 'email' = ? AND 'password' = ?";
    db.query(sql, [req.nody.email, req.body.password], (err, data) = {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
        return res.json(errors);
        } else { 
        if (err) {
            return res.json("Error");
        }
        if (data.lenght > 0) {
            return res.json("Success");
        } else {
            return res.json("Faile");
        }

        }
        
    })
})


app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});
