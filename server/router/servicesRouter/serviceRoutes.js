import express from 'express'
import {
  getAllServices,
  uploadImages,
} from '../../controller/servicesController/serviceController.js'
import { uploadPhoto } from '../../middleware/uploadPhoto.js'

const router = express.Router()

router.get('/', getAllServices)
router.put('/upload/:id', uploadPhoto.array('images', 10), uploadImages)

export default router
