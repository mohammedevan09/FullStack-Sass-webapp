import express from 'express'
import {
  createSubscriptionServiceOrder,
  deleteSubscriptionServiceOrderById,
  getSubscriptionServiceOrderById,
  updateSubscriptionServiceOrderById,
} from '../../controller/orderController/subscriptionServiceOrderController.js'

const router = express.Router()

router.post('/', createSubscriptionServiceOrder)
router.get('/:id', getSubscriptionServiceOrderById)
router.put('/:id', updateSubscriptionServiceOrderById)
router.delete('/:id', deleteSubscriptionServiceOrderById)

export default router
