import express from 'express'
import {
  findOrCreateUserSettings,
  updateUserSetting,
} from '../../controller/userController/userSettingController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.put('/:id', findOrCreateUserSettings)
router.put('/update/:id', authMiddleware, updateUserSetting)

export default router
