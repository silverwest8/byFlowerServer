import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _FLOWER_LIKE from  "./FLOWER_LIKE.js";
import _LETTER from  "./LETTER.js";
import _USER from  "./USER.js";

export default function initModels(sequelize) {
  const FLOWER_LIKE = _FLOWER_LIKE.init(sequelize, DataTypes);
  const LETTER = _LETTER.init(sequelize, DataTypes);
  const USER = _USER.init(sequelize, DataTypes);

  FLOWER_LIKE.belongsTo(USER, { as: "USER", foreignKey: "USER_ID"});
  USER.hasMany(FLOWER_LIKE, { as: "FLOWER_LIKEs", foreignKey: "USER_ID"});
  LETTER.belongsTo(USER, { as: "USER", foreignKey: "USER_ID"});
  USER.hasMany(LETTER, { as: "LETTERs", foreignKey: "USER_ID"});

  return {
    FLOWER_LIKE,
    LETTER,
    USER,
  };
}
