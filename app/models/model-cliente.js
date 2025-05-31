// models/model-cliente.js
const pool = require("../../config/pool-conexoes");

const VendedorModel = {
  // Buscar vendedor por ID de usuário
  buscarPorUsuarioId: async (usuarioId) => {
    try {
      const query = "SELECT * FROM Clientes WHERE UsuarioId = ?";
      const [rows] = await pool.query(query, [usuarioId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Erro ao buscar Cliente:", error);
      throw error;
    }
  },

  // Criar novo vendedor
  create: async (clienteData) => {
    try {
      const { UsuarioId, CPF } = clienteData;

      const query = `
        INSERT INTO Clientes (UsuarioId, CPF)
        VALUES (?, ?)
      `;
      
      const [result] = await pool.query(query, [UsuarioId, CPF]);
      return result.insertId;
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      throw error;
    }
  }
};

module.exports = ClienteModel;