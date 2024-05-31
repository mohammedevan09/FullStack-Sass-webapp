import express from 'express'
import { teamMiddleware } from '../../middleware/teamMiddleware.js'
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from '../../controller/ticketController/ticketController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, createTicket)
router.get('/', teamMiddleware, getAllTickets)
router.get('/:id', getTicketById)
router.put('/:id', authMiddleware, updateTicket)
router.delete('/:id', authMiddleware, deleteTicket)

export default router
