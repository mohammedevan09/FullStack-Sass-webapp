import express from 'express'
import { getAllServices } from '../../controller/servicesController/serviceController.js'
import { uploadImages } from '../../controller/servicesController/uploadImage.js'
import { imgResize, uploadPhoto } from '../../middleware/uploadPhoto.js'

const router = express.Router()

router.get('/', getAllServices)
router.put(
  '/upload/:id',
  uploadPhoto.array('images', 10),
  imgResize,
  uploadImages
)

export default router
