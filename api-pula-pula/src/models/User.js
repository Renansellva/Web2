const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100] // Garante tamanho mínimo de 3 caracteres (igual a trigger)
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Valida o formato do email automaticamente!
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users', // Nome exato da tabela no banco
  timestamps: true    // Cria o created_at e updated_at automaticamente
});

module.exports = User;