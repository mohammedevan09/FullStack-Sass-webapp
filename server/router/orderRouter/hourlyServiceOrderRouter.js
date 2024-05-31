import express from 'express'
import {
  createHourlyServiceOrder,
  deleteHourlyServiceOrderById,
  getHourlyServiceOrderById,
  addHourlyTimeLogs,
  updateHourlyTimeLog,
  removeHourlyTimeLog,
} from '../../controller/orderController/hourlyServiceOrderController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
import { updateOrderById } from '../../controller/orderController/orderController.js'

const router = express.Router()

router.post('/', authMiddleware, createHourlyServiceOrder)
router.get('/:id', getHourlyServiceOrderById)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    await updateOrderById(req, res, next, 'project')
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', authMiddleware, deleteHourlyServiceOrderById)
router.put('/hourlyTimeLogs/:orderId', authMiddleware, addHourlyTimeLogs)
router.put(
  '/hourlyTimeLogs/:orderId/:logId',
  authMiddleware,
  updateHourlyTimeLog
)
router.delete(
  '/hourlyTimeLogs/:orderId/:logId',
  authMiddleware,
  removeHourlyTimeLog
)

export default router
