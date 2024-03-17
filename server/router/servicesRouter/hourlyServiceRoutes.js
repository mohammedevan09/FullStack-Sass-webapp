import express from 'express'
import {
  createHourlyService,
  deleteHourlyServiceById,
  getAllHourlyServices,
  getHourlyServiceById,
  getHourlyServiceByUserId,
  updateHourlyService,
} from '../../controller/servicesController/hourlyServiceController.js'

const router = express.Router()

router.post('/', createHourlyService)
router.put('/:id', updateHourlyService)
router.get('/', getAllHourlyServices)
router.get('/:id', getHourlyServiceById)
router.get('/userId/:id', getHourlyServiceByUserId)
router.delete('/:id', deleteHourlyServiceById)

export default router
