import express from 'express';
import productRouter from './products';
import routerAuth from './auth';
const router = express.Router();

router.use('/products',productRouter);
router.use('/auth',routerAuth);

export default router