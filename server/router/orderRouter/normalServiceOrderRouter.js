import express from 'express'
import {
  createNormalServiceOrder,
  deleteNormalServiceOrderById,
  getNormalServiceOrderById,
} from '../../controller/orderController/normalServiceOrderController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
import { updateOrderById } from '../../controller/orderController/orderController.js'

const router = express.Router()

router.post('/', authMiddleware, createNormalServiceOrder)
router.get('/:id', getNormalServiceOrderById)
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    await updateOrderById(req, res, next, 'project')
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', authMiddleware, deleteNormalServiceOrderById)

export default router
