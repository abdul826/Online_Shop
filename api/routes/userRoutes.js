import express from 'express';
import { authUser,registerUser,logoutUser,getUserProfile,getUsers,getUserByID,deleteUser,updateUser, updateUserProfile } from '../controllers/userController.js';
import { protect,admin } from '../middlewre/authMiddleware.js';
const router = express.Router();


router.post('/auth',authUser);
router.get('/', protect,admin,getUsers)
router.post('/register',registerUser);
router.post('/logout',logoutUser);
router.get('/profile',protect,getUserProfile).put('/profile',protect,updateUserProfile);
router.delete('/:id',protect,admin,deleteUser);
router.get('/:id', protect,admin,getUserByID);
router.put('/:id',protect,admin,updateUser);

export default router;