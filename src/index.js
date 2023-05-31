'use strict';

import express from 'express';
import Routers from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', Routers);

sequelize
  .sync({ force: false }) //true면 서버 실행마다 테이블 재생성
  .then(() => {
    console.log('Mysql Connecting Success with Sequelize');
  })
  .catch((err) => {
    console.error(err);
  });

//---- 서버 시작
app.listen(port, () => {
  console.log(`Server on "${port}" PortNum`);
});
