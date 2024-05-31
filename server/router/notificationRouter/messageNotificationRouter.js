import express from 'express'

import {
  deleteMessageNotification,
  findOrCreateChatNotification,
  getAllMessageNotification,
  readAllMessageNotification,
  readMessageNotification,
} from '../../controller/notificationController/messageNotificationController.js'
import { teamMiddleware } from '../../middleware/teamMiddleware.js'

const router = express.Router()

router.put('/:id', findOrCreateChatNotification)
router.get('/', teamMiddleware, getAllMessageNotification)
router.put('/', readAllMessageNotification)
router.put('/read/:id', readMessageNotification)
router.delete('/:id', deleteMessageNotification)

export default router
