import express from 'express'
import {
  createHourlyServiceOrder,
  deleteHourlyServiceOrderById,
  getHourlyServiceOrderById,
  updateHourlyServiceOrderById,
  addHourlyTimeLogs,
  updateHourlyTimeLog,
  removeHourlyTimeLog,
} from '../../controller/orderController/hourlyServiceOrderController.js'

const router = express.Router()

router.post('/', createHourlyServiceOrder)
router.get('/:id', getHourlyServiceOrderById)
router.put('/:id', updateHourlyServiceOrderById)
router.delete('/:id', deleteHourlyServiceOrderById)
router.put('/hourlyTimeLogs/:orderId', addHourlyTimeLogs)
router.put('/hourlyTimeLogs/:orderId/:logId', updateHourlyTimeLog)
router.delete('/hourlyTimeLogs/:orderId/:logId', removeHourlyTimeLog)

export default router
