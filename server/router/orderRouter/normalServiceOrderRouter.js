import express from 'express'
import {
  createNormalServiceOrder,
  deleteNormalServiceOrderById,
  getNormalServiceOrderById,
  updateNormalServiceOrderById,
} from '../../controller/orderController/normalServiceOrderController.js'

const router = express.Router()

router.post('/', createNormalServiceOrder)
router.get('/:id', getNormalServiceOrderById)
router.put('/:id', updateNormalServiceOrderById)
router.delete('/:id', deleteNormalServiceOrderById)

export default router
