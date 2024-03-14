import express from 'express'
import { getAllServices } from '../../controller/servicesController/serviceController.js'

const router = express.Router()

router.get('/', getAllServices)

export default router
