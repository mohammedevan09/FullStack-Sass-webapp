import express from 'express'
import {
  createNormalService,
  updateNormalService,
} from '../../controller/servicesController/normalServiceController.js'
import { uploadPhoto } from '../../middleware/uploadPhoto.js'

const router = express.Router()

router.post('/', uploadPhoto.array('images', 1), createNormalService)
router.put('/update', uploadPhoto.array('images', 1), updateNormalService)

export default router
