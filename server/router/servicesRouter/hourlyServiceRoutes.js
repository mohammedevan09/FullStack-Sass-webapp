import express from 'express'
import {
  createHourlyService,
  deleteHourlyServiceById,
  getAllHourlyServices,
  getHourlyServiceById,
  getHourlyServiceByUserId,
  updateHourlyService,
} from '../../controller/servicesController/hourlyServiceController.js'
import { authMiddleware, isAdmin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createHourlyService)
router.put('/:id', authMiddleware, isAdmin, updateHourlyService)
router.get('/', getAllHourlyServices)
router.get('/:id', getHourlyServiceById)
router.get('/userId/:id', getHourlyServiceByUserId)
router.delete('/:id', authMiddleware, isAdmin, deleteHourlyServiceById)

export default router
