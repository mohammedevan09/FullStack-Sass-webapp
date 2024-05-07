import express from 'express'
import { getAllOrder } from '../../controller/orderController/orderController.js'
import { teamMiddleware } from '../../middleware/teamMiddleware.js'

const router = express.Router()

router.get('/', teamMiddleware, getAllOrder)

export default router
