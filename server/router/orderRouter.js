import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import Order from '../model/orderModal.js'
import WebsiteDesignAndDev from '../model/serviceModels/websiteDesignAndDevModal.js'

const router = express.Router()

router.post('/websiteDesignAndDev', async (req, res) => {
  try {
    const newOrder = await WebsiteDesignAndDev.create(req.body)
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Create a new order for HourlyPlan
router.post('/hourlyPlan', async (req, res) => {
  try {
    const order = new Order(req.body)
    const savedOrder = await order.save()
    res.status(201).json(savedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Create a new order for Maintenance
router.post('/maintenance', async (req, res) => {
  try {
    const order = new Order(req.body)
    const savedOrder = await order.save()
    res.status(201).json(savedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
