'use strict';

import express from 'express';
import dotenv from 'dotenv';
import { db } from '../models/index.js';
// import axios from "axios";
dotenv.config();

const router = express.Router();

router.post('/like', async (req, res) => {
  try {
    const flowerId = req.query.dataNo;
    const userId = req.headers.user_id;
    console.log('[POST]flowers/like', flowerId, userId);
    const flower = await db.FLOWER_LIKE.create({
      FLOWER_ID: flowerId,
      USER_ID: userId,
    });
    return res.status(200).json({
      success: true,
      message: 'Flower Like 성공',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Flower Like 실패', error });
  }
});

router.delete('/like/cancel', async (req, res) => {
  try {
    const flowerId = req.query.dataNo;
    const userId = req.headers.user_id;
    console.log('[DELETE]flowers/like/cancel', flowerId, userId);
    const flower = await db.FLOWER_LIKE.destroy({
      where: { FLOWER_ID: flowerId, USER_ID: userId },
    });

    return res.status(200).json({
      success: true,
      message: 'Flower Like Cancel 성공',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Flower Like Cancel 실패', error });
  }
});

router.get('/like', async (req, res) => {
  try {
    const flowerId = req.query.dataNo;
    const userId = req.headers.user_id;
    console.log('[GET]flowers/like', flowerId, userId);
    const flowerLike = await db.FLOWER_LIKE.findOne({
      where: { FLOWER_ID: flowerId, USER_ID: userId },
    });
    let liked = false;
    if (flowerLike) {
      liked = true;
    }
    return res
      .status(200)
      .json({ success: true, message: '좋아요 정보 조회 성공', liked });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: '좋아요 정보 조회 실패', error });
  }
});

router.get('/mylist', async (req, res) => {
  try {
    let list = [];
    const userId = req.headers.user_id;
    const myflower = await db.FLOWER_LIKE.findAll({
      where: {
        USER_ID: userId,
      },
      order: [['FLOWER_ID', 'ASC']],
    });
    console.log(myflower);
    for (let i = 0; i < myflower.length; i++) {
      const flower = myflower[i];
      list.push(flower.FLOWER_ID);
    }
    console.log(list);
    return res
      .status(200)
      .json({ success: true, message: '좋아요 한 꽃 리스트 조회 성공', list });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: '좋아요 한 꽃 리스트 조회 실패',
      error,
    });
  }
});

export default router;
