import express from 'express'
import {
  createHourlyServiceOrder,
  deleteHourlyServiceOrderById,
  getHourlyServiceOrderById,
  updateHourlyServiceOrderById,
} from '../../controller/orderController/hourlyServiceOrderController.js'

const router = express.Router()

router.post('/', createHourlyServiceOrder)
router.get('/:id', getHourlyServiceOrderById)
router.put('/:id', updateHourlyServiceOrderById)
router.delete('/:id', deleteHourlyServiceOrderById)

export default router
