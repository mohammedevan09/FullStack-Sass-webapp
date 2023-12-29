import express from 'express'
import {
  createUser,
  googleLoginUser,
  handleRefreshToken,
  loginUser,
  logoutUser,
  sendVerifyEmail,
  updateUser,
  verifyEmail,
} from '../controller/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/google-login', googleLoginUser)
router.post('/send-email-verification', sendVerifyEmail)
router.put('/handleRefreshToken', handleRefreshToken)
router.get('/logout', logoutUser)
router.put('/update', authMiddleware, updateUser)
router.get('/:id/verify/:token/', verifyEmail)

export default router
