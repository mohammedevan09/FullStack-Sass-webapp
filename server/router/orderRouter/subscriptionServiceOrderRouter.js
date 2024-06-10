import express from 'express'
import {
  createSubscriptionServiceOrder,
  deleteSubscriptionServiceOrderById,
  getSubscriptionServiceOrderById,
  renewOrCancelStripeSubscription,
} from '../../controller/orderController/subscriptionServiceOrderController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
import { updateOrderById } from '../../controller/orderController/orderController.js'

const router = express.Router()

router.post('/', authMiddleware, createSubscriptionServiceOrder)
router.put('/renew/:id', authMiddleware, renewOrCancelStripeSubscription)
router.get('/:id', getSubscriptionServiceOrderById)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    await updateOrderById(req, res, next, 'subscription')
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', authMiddleware, deleteSubscriptionServiceOrderById)

export default router
