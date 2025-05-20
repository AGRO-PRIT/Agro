// models/Usuario.js
var pool = require("../../config/pool-conexoes");

const usuarioModel = {
    findAll: async () => {
        try {
            const [linhas] = await pool.query('SELECT * FROM Usuarios WHERE id > 0') // Adapte conforme sua regra de status
            return linhas;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    findId: async (id) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id])
            return linhas[0]; // Retorna apenas o primeiro registro
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    findPage: async (pagina, total) => {
        try {
            const inicio = (pagina - 1) * total;
            const [linhas] = await pool.query('SELECT * FROM Usuarios LIMIT ?, ?', [inicio, total])
            return linhas;
        } catch (error) {
            console.error(error);
            return error;
        }  
    },
    
    create: async (dadosForm) => {
        try {
            const [result] = await pool.query('INSERT INTO Usuarios SET ?', [dadosForm])
            return result.insertId; // Retorna o ID do novo usuário
        } catch (error) {
            console.error(error);
            return null;
        }  
    },

    update: async (dadosForm, id) => {
        try {
            const [result] = await pool.query('UPDATE Usuarios SET ? WHERE id = ?', [dadosForm, id])
            return result.affectedRows > 0; // Retorna true/false
        } catch (error) {
            console.error(error);
            return false;
        }  
    },

    delete: async (id) => {
        try {
            // Opção 1: Exclusão física (DELETE)
            // const [result] = await pool.query('DELETE FROM Usuarios WHERE id = ?', [id])
            
            // Opção 2: Exclusão lógica (recomendado, igual ao do professor)
            const [result] = await pool.query('UPDATE Usuarios SET ativo = 0 WHERE id = ?', [id])
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error(error);
            return false;
        }  
    },

    findByEmail: async (email) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM Usuarios WHERE Email = ?', [email])
            return linhas[0]; // Retorna o usuário ou undefined
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    totalReg: async () => {
        try {
            const [linhas] = await pool.query('SELECT COUNT(*) as total FROM Usuarios WHERE id > 0') // Adapte conforme necessário
            return linhas[0].total;
        } catch (error) {
            console.error(error);
            return 0;
        }  
    },

    // Adicione outros métodos específicos para usuários
    buscarVendedores: async () => {
        try {
            const [linhas] = await pool.query(`
                SELECT u.* FROM Usuarios u
                JOIN vendedores v ON u.id = v.UsuarioId
                WHERE u.id > 0
            `)
            return linhas;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};

module.exports = usuarioModel;