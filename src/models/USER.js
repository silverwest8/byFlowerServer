import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class USER extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    NAME: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    MONTH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DAY: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'USER',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
  }
}
