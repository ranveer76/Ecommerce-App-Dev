import express from 'express';
const router = express.Router();
import { create, list, read, update, remove } from '../controllers/category.js';

router.post('/category', create);
router.get('/category', list);
router.get('/category/:id', read);
router.put('/category/:id', update);
router.delete('/category/:id', remove);

export default router;