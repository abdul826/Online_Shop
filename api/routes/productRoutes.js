import express from 'express';
import { getProducts,getProduct,createProduct,updateProduct } from '../controllers/productController.js';
import { protect,admin } from '../middlewre/authMiddleware.js';
const router = express.Router();


router.get('/',getProducts);

router.get('/:id', getProduct);

router.post('/addProduct',protect,admin, createProduct);

router.put('/:id',protect,admin, updateProduct);

export default router;