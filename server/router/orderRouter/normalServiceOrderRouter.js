import express from 'express'
import {
  createNormalServiceOrder,
  getNormalServiceOrderById,
  updateNormalServiceOrderById,
} from '../../controller/orderController/normalServiceOrderController.js'

const router = express.Router()

router.post('/', createNormalServiceOrder)
router.get('/:id', getNormalServiceOrderById)
router.put('/:id', updateNormalServiceOrderById)

export default router
