const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    port: process.env.BD_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


pool.getConnection((err, conn) => { 
    
    if(err){
        console.log(err)
        console.log("Erro :(")
    }
    else{
        console.log("Conectado ao SGBD! ;)")
    }
})

module.exports = pool.promise()
