import express from 'express'
import {
  createNormalService,
  deleteNormalServiceById,
  getAllNormalServices,
  getNormalServiceById,
  getNormalServiceByUserId,
  updateNormalService,
} from '../../controller/servicesController/normalServiceController.js'
import { authMiddleware, isAdmin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createNormalService)
router.put('/:id', authMiddleware, isAdmin, updateNormalService)
router.get('/', getAllNormalServices)
router.get('/:id', getNormalServiceById)
router.get('/userId/:id', getNormalServiceByUserId)
router.delete('/:id', authMiddleware, isAdmin, deleteNormalServiceById)

export default router
