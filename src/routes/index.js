'use strict';

import express from 'express';
const router = express.Router();

import user from './user.js';
import flower from './flower.js';
import letter from './letter.js';

router.use('/users', user);
router.use('/flowers', flower);
router.use('/letters', letter);

export default router;
