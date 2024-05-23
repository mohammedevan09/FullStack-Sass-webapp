import express from 'express'
import {
  adminLogin,
  blockUser,
  createUser,
  forgotPassword,
  getAllUsers,
  getUserById,
  googleLoginUser,
  handleRefreshToken,
  loginUser,
  logoutUser,
  resetPassword,
  sendVerifyEmail,
  updateUser,
  uploadProfilePicture,
  verifyEmail,
} from '../../controller/userController/userController.js'
import { authMiddleware, isAdmin } from '../../middleware/authMiddleware.js'
import { uploadPhoto } from '../../middleware/uploadPhoto.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/adminLogin', adminLogin)
router.post('/google-login', googleLoginUser)
router.post('/send-email-verification', sendVerifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:id/:token', resetPassword)
router.get('/handleRefreshToken', handleRefreshToken)
router.get('/all', getAllUsers)
router.get('/logout', logoutUser)
router.get('/findUser', authMiddleware, getUserById)
router.put('/update', authMiddleware, updateUser)
router.put('/block/:id', authMiddleware, isAdmin, blockUser)
router.put(
  '/upload/:id',
  authMiddleware,
  uploadPhoto.array('images', 1),
  uploadProfilePicture
)

router.get('/:id/verify/:token/', verifyEmail)

export default router
