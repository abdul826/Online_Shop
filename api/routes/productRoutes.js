import express from 'express';
import { getProducts,getProduct,createProduct,updateProduct, deleteProduct, createProductReview , getTopProducts} from '../controllers/productController.js';
import { protect,admin } from '../middlewre/authMiddleware.js';
const router = express.Router();


router.get('/',getProducts);

router.get('/:id', getProduct);

router.post('/addProduct',protect,admin, createProduct);

router.put('/:id',protect,admin, updateProduct);

router.delete('/:id',protect,admin, deleteProduct);

router.post('/:id/reviews',protect, createProductReview);

router.get('/top',getTopProducts);

export default router;