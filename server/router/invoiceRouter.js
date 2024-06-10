import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { teamMiddleware } from '../middleware/teamMiddleware.js'
import { getAllInvoices } from '../controller/invoiceController.js'

const router = express.Router()

router.get('/', teamMiddleware, getAllInvoices)

export default router
