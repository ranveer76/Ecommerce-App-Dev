import express from 'express';
const router = express.Router();
import { create, list, read, update, remove } from '../controllers/product.js';

router.post('/product', create);
router.get('/product', list);
router.get('/product/:id', read);
router.put('/product/:id', update);
router.delete('/product/:id', remove);

export default router;