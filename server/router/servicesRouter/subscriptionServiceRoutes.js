import express from 'express'
import {
  createSubscriptionService,
  deleteSubscriptionServiceById,
  getAllSubscriptionServices,
  getSubscriptionServiceById,
  getSubscriptionServiceByUserId,
  updateSubscriptionService,
} from '../../controller/servicesController/subscriptionServiceController.js'

const router = express.Router()

router.post('/', createSubscriptionService)
router.put('/:id', updateSubscriptionService)
router.get('/', getAllSubscriptionServices)
router.get('/:id', getSubscriptionServiceById)
router.get('/userId/:id', getSubscriptionServiceByUserId)
router.delete('/:id', deleteSubscriptionServiceById)

export default router
