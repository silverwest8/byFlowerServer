import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LETTER extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    LETTER_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'USER',
        key: 'ID'
      }
    },
    TO: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    FROM: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    TEXT: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PATH: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PRIVATE: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    DATE: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'LETTER',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "LETTER_ID" },
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
