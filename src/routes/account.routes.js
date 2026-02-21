import express from 'express';
import {create} from '../controllers/account.controller.js';

const router = express.Router();

router.post('/create',create);

export default router;