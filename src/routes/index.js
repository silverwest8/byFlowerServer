'use strict';

import express from 'express';
const router = express.Router();

import user from './user.js';

router.use('/users', user);


export default router;
