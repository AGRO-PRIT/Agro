const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.BD_PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

// Teste de conexão (opcional)
pool.getConnection((err, conn) => {
    if(err) {
        console.error("Erro ao conectar:", err);
    } else {
        console.log("Conectado ao SGBD! ;)");
        conn.release(); // Libera a conexão de teste
    }
});

// Exporte o pool com Promise API
module.exports = pool.promise();