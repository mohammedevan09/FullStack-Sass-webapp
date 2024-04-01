import express from 'express'
import { getAllOrder } from '../../controller/orderController/orderController.js'

const router = express.Router()

router.get('/', getAllOrder)

export default router
