import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { createWebsiteDesignAndDev } from '../controller/orderController.js'
import Order from '../model/orderModal.js'

const router = express.Router()

router.post(
  '/websiteDesignAndDev/create-checkout-session',
  createWebsiteDesignAndDev
)

export default router
