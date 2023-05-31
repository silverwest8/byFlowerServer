'use strict';

import express from 'express';
import dotenv from 'dotenv';
import { db } from '../models/index.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
dotenv.config();

const router = express.Router();
const __dirname = path.resolve();

// 파일 업로드를 위해 사용되는 multipart/form-data 를 front에서 사용할것

//multer 미들웨어 파일 제한 값 (Doc 공격으로부터 서버를 보호하는데 도움이 된다.)
// const limits = {
//   fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
//   filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
//   fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
//   fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
//   files: 5, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
// };
const fileFilter = (req, file, callback) => {
  const typeArray = file.originalname.split('.');
  const fileType = typeArray[typeArray.length - 1]; // 이미지 확장자 추출
  //이미지 확장자 구분 검사
  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    return callback(
      { message: '*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.' },
      false
    );
  }
};
//multer 미들웨어 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 파일이 업로드되는 경로 지정
  },
  filename: function (req, file, cb) {
    const date = new Date();
    date.toLocaleDateString('ko-KR'); // 한국 시간 설정
    cb(
      null,
      `${date.getFullYear()}${
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`
      }${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}${
        date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
      }${
        date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
      }${
        date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`
      }_${file.originalname}`
    ); // 파일 이름 설정
  },
});
const upload = multer({
  storage: storage,
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
  // limits: limits, // 이미지 업로드 제한 설정
  fileFilter: fileFilter, // 이미지 업로드 필터링 설정
});

router.post(
  '/',
  upload.fields([
    { name: 'id' },
    { name: 'to' },
    { name: 'from' },
    { name: 'text' },
    { name: 'date' },
    { name: 'private' },
    { name: 'image' },
  ]),
  async (req, res) => {
    console.log('HERE IS POST letters/');
    try {
      console.log(req.headers.user_id);
      console.log(req.body.to);
      console.log(req.body.from);
      console.log(req.body.text);
      console.log(req.body.date);
      console.log(req.body.private);
      console.log(req.files.image);
      const letter = await db.LETTER.create({
        USER_ID: req.headers.user_id,
        TO: req.body.to,
        FROM: req.body.from,
        TEXT: req.body.text,
        DATE: req.body.date,
        PRIVATE: req.body.private === 'true',
        PATH: req.files.image[0].path,
      });
      console.log(letter);
      return res.status(200).json({ success: true, message: '편지 등록 성공' });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ success: false, message: '편지 등록 실패', error });
    }
  }
);

router.get('/list', async (req, res) => {
  console.log('-- HERE IS letters/list');
  try {
    let list = [];
    const letterList = await db.LETTER.findAll({
      where: {
        PRIVATE: 0,
      },
      order: [['createdAt', 'DESC']],
    });
    console.log(letterList);
    for (let i = 0; i < letterList.length; i++) {
      const letter = letterList[i];
      let temp = {
        id: letter.LETTER_ID,
        user: letter.USER_ID,
        to: letter.TO,
        from: letter.FROM,
        text: letter.TEXT,
        path: letter.PATH,
        date: letter.DATE,
      };
      list.push(temp);
      console.log(temp);
    }
    return res
      .status(200)
      .json({ success: true, message: '편지 리스트 조회 성공', list });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: '편지 리스트 조회 실패', error });
  }
});

router.get('/list/my', async (req, res) => {
  console.log('-- HERE IS letters/list2');
  try {
    let list = [];
    const letterList = await db.LETTER.findAll({
      where: {
        USER_ID: req.headers.user_id,
      },
      order: [['createdAt', 'DESC']],
    });
    console.log(letterList);
    for (let i = 0; i < letterList.length; i++) {
      const letter = letterList[i];
      let temp = {
        id: letter.LETTER_ID,
        user: letter.USER_ID,
        to: letter.TO,
        from: letter.FROM,
        text: letter.TEXT,
        path: letter.PATH,
        date: letter.DATE,
      };
      list.push(temp);
      console.log(temp);
    }
    return res
      .status(200)
      .json({ success: true, message: '편지 리스트2 조회 성공', list });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: '편지 리스트2 조회 실패', error });
  }
});

router.get('/image/:letterId', async (req, res) => {
  try {
    console.log('-- HERE IS letters/image/:letterId');
    const letterId = req.params.letterId;
    const letter = await db.LETTER.findByPk(letterId);
    // 이미지 없으면 로고 이미지 보내줌
    if (!letter.PATH) {
      const data = fs.readFileSync('uploads/logo.png');
      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      res.write(data);
      return res.end();
    }
    const data = fs.readFileSync(letter.PATH);
    console.log(data);
    res.writeHead(200, { 'Content-Type': 'image/jpg' }); //보낼 헤더를 만듬
    res.write(data); //본문을 만들고
    return res.end(); //클라이언트에게 응답을 전송한다
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Letter Image get 실패', error });
  }
});

export default router;
