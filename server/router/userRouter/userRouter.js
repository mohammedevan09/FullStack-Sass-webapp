import express from 'express'
import {
  adminLogin,
  createUser,
  forgotPassword,
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
import { authMiddleware } from '../../middleware/authMiddleware.js'
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
router.get('/logout', logoutUser)
router.get('/findUser', authMiddleware, getUserById)
router.put('/update', authMiddleware, updateUser)
router.put('/upload/:id', uploadPhoto.array('images', 1), uploadProfilePicture)

router.get('/:id/verify/:token/', verifyEmail)

export default router
