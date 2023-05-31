import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class FLOWER_LIKE extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    FLOWER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'USER',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'FLOWER_LIKE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "FLOWER_ID" },
        ]
      },
      {
        name: "USER_ID_idx",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
