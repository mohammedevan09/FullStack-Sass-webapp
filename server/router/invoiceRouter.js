import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { teamMiddleware } from '../middleware/teamMiddleware.js'
import {
  getAllInvoices,
  getInvoice,
  payNowOrderOrProposal,
} from '../controller/invoiceController.js'

const router = express.Router()

router.get('/', teamMiddleware, getAllInvoices)
router.get('/:id', getInvoice)
router.put('/pay/:id', authMiddleware, payNowOrderOrProposal)

export default router
