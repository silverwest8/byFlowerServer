import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LIKE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    USER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FLOWER: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'LIKE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER" },
          { name: "FLOWER" },
        ]
      },
    ]
  });
  }
}
