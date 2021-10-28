const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuario', {
    usuario_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dpi: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    username: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: "username"
    },
    correo: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: "correo"
    },
    password: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario_id" },
        ]
      },
      {
        name: "usuario_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario_id" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "dpi",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dpi" },
        ]
      },
      {
        name: "correo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "correo" },
        ]
      },
    ]
  });
};
