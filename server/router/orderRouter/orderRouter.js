import express from 'express'
import { createWebsiteDesignAndDev } from '../../controller/orderController/orderController.js'

const router = express.Router()

router.post(
  '/websiteDesignAndDev/create-checkout-session',
  createWebsiteDesignAndDev
)

export default router
