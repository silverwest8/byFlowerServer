'use strict';

import express from 'express';
import dotenv from 'dotenv';
import { db } from '../models/index.js';
// import axios from "axios";
dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    const user = await db.USER.findOrCreate({
      where: {
        ID: req.body.id,
      },
      defaults: {
        NAME: req.body.name,
        MONTH: req.body.month,
        DAY: req.body.day,
      },
    });
    console.log(user);
    return res.status(200).json({ success: true, message: '회원가입 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '회원가입 실패', error });
  }
});

//회원 탈퇴
router.delete('/', async (req, res) => {
  try {
    console.log(req.query.id);
    const user = await db.USER.destroy({
      where: {
        ID: req.query.id,
      },
    });
    console.log(user);
    return res.status(200).json({ success: true, message: '회원 탈퇴 성공' });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: '회원 탈퇴 실패', error });
  }
});

export default router;
