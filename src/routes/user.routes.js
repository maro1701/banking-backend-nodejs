import express from 'express';
import {user} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create',user);

export default router;