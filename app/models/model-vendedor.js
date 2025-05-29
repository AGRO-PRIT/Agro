// models/model-vendedor.js
const pool = require("../../config/pool-conexoes");

const VendedorModel = {
  // Buscar vendedor por ID de usuário
  buscarPorUsuarioId: async (usuarioId) => {
    try {
      const query = "SELECT * FROM Vendedores WHERE UsuarioId = ?";
      const [rows] = await pool.query(query, [usuarioId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Erro ao buscar vendedor por UsuarioId:", error);
      throw error;
    }
  },

  // Criar novo vendedor
  create: async (vendedorData) => {
    try {
      const { UsuarioId, CNPJ } = vendedorData;

      const query = `
        INSERT INTO Vendedores (UsuarioId, CNPJ)
        VALUES (?, ?)
      `;
      
      const [result] = await pool.query(query, [UsuarioId, CNPJ]);
      return result.insertId;
    } catch (error) {
      console.error("Erro ao criar vendedor:", error);
      throw error;
    }
  }
};

module.exports = VendedorModel;