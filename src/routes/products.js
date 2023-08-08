import express from 'express';
import { create, getAll, getDetail, remove, update } from '../controllers/products';

const productRouter = express.Router();

productRouter.get('/', getAll);
productRouter.get('/:id', getDetail);
productRouter.post('/:id', update);
productRouter.delete('/:id', remove);
productRouter.post('/', create);

export default productRouter
