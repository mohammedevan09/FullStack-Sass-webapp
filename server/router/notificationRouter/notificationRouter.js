import express from 'express'

import { teamMiddleware } from '../../middleware/teamMiddleware.js'
import {
  deleteNotification,
  getAllNotification,
  updateManyNotification,
  updateOneNotification,
} from '../../controller/notificationController/notificationController.js'

const router = express.Router()

router.get('/', teamMiddleware, getAllNotification)
router.put('/', updateManyNotification)
router.put('/:id', updateOneNotification)
router.delete('/:id', deleteNotification)

export default router
