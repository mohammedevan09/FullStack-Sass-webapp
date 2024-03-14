import express from 'express'
import { uploadPhoto } from '../../middleware/uploadPhoto.js'
import {
  createSubscriptionService,
  updateSubscriptionService,
} from '../../controller/servicesController/subscriptionServiceController.js'

const router = express.Router()

router.post('/', uploadPhoto.array('images', 1), createSubscriptionService)
router.put('/update', uploadPhoto.array('images', 1), updateSubscriptionService)

export default router
