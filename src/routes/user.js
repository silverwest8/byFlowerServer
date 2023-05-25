"use strict";

import express from "express";
import dotenv from "dotenv";
// import { db } from "../models";
// import axios from "axios";
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "닉네임 수정 성공" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "닉네임 수정 실패", error });
  }
});

// 회원 정보 조회
router.get("/", async (req, res) => {
  try {
    console.log(req.user);
    return res
      .status(200)
      .json({ success: true, message: "회원 정보 조회 성공", data: req.user });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "회원 정보 조회 실패", error });
  }
});

//회원 정보 수정
router.put("/", async (req, res) => {
  try {
    const newNickname = req.body.nickname;
    req.user.update({ NICKNAME: newNickname });
    return res.status(200).json({ success: true, message: "닉네임 수정 성공" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "닉네임 수정 실패", error });
  }
});

//회원 탈퇴
router.delete("/", async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "닉네임 수정 성공" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "닉네임 수정 실패", error });
  }
});

export default router;
