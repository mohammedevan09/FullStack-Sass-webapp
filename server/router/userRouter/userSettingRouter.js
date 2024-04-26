import express from 'express'
import {
  findOrCreateUserSettings,
  updateUserSetting,
} from '../../controller/userController/userSettingController.js'

const router = express.Router()

router.put('/:id', findOrCreateUserSettings)
router.put('/update/:id', updateUserSetting)

export default router
