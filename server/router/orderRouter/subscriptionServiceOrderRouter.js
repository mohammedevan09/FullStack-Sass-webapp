import express from 'express'
import {
  createSubscriptionServiceOrder,
  getSubscriptionServiceOrderById,
} from '../../controller/orderController/subscriptionServiceOrderController.js'

const router = express.Router()

router.post('/', createSubscriptionServiceOrder)
router.get('/:id', getSubscriptionServiceOrderById)

export default router
