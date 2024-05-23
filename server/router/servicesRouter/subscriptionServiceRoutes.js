import express from 'express'
import {
  createSubscriptionService,
  deleteSubscriptionServiceById,
  getAllSubscriptionServices,
  getSubscriptionServiceById,
  getSubscriptionServiceByUserId,
  updateSubscriptionService,
} from '../../controller/servicesController/subscriptionServiceController.js'
import { authMiddleware, isAdmin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createSubscriptionService)
router.put('/:id', authMiddleware, isAdmin, updateSubscriptionService)
router.get('/', getAllSubscriptionServices)
router.get('/:id', getSubscriptionServiceById)
router.get('/userId/:id', getSubscriptionServiceByUserId)
router.delete('/:id', authMiddleware, isAdmin, deleteSubscriptionServiceById)

export default router
