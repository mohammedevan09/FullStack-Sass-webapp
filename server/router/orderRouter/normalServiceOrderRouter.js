import express from 'express'
import {
  createNormalServiceOrder,
  getNormalServiceOrderById,
} from '../../controller/orderController/normalServiceOrderController.js'

const router = express.Router()

router.post('/create-checkout-session', createNormalServiceOrder)
router.get('/:id', getNormalServiceOrderById)

export default router
