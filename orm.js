"use strict";

import dotenv from "dotenv";
dotenv.config();
import Sequelize from "sequelize-auto";
const sequelizeAuto = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: "3306",
    dialect: "mysql",
    directory: "./src/models",
    lang: "esm",
    // tables: [
    //   'AUTH_CODE',
    //   'COCKTAIL_LIKE',
    //   'COCKTAIL_REPORT',
    //   'COCKTAIL',
    //   'COLOR',
    //   'IMAGE',
    //   'KEYWORD',
    //   'PLACE',
    //   'POST_LIKE',
    //   'POST_REPLY',
    //   'POST_REPORT',
    //   'POST',
    //   'RECIPE',
    //   'REVIEW',
    //   'USER'
    // ],
  }
);

sequelizeAuto.run((err) => {
  if (err) throw err;
});
