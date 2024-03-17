import express from 'express'
import {
  createNormalService,
  deleteNormalServiceById,
  getAllNormalServices,
  getNormalServiceById,
  getNormalServiceByUserId,
  updateNormalService,
} from '../../controller/servicesController/normalServiceController.js'

const router = express.Router()

router.post('/', createNormalService)
router.put('/:id', updateNormalService)
router.get('/', getAllNormalServices)
router.get('/:id', getNormalServiceById)
router.get('/userId/:id', getNormalServiceByUserId)
router.delete('/:id', deleteNormalServiceById)

export default router
