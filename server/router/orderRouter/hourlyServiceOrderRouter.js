import express from 'express'
import {
  createHourlyServiceOrder,
  getHourlyServiceOrderById,
} from '../../controller/orderController/hourlyServiceOrderController.js'

const router = express.Router()

router.post('/', createHourlyServiceOrder)
router.get('/:id', getHourlyServiceOrderById)

export default router
