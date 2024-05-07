import express from 'express'
import { teamMiddleware } from '../../middleware/teamMiddleware.js'
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from '../../controller/ticketController/ticketController.js'

const router = express.Router()

router.post('/', createTicket)
router.get('/', teamMiddleware, getAllTickets)
router.get('/:id', getTicketById)
router.put('/:id', updateTicket)
router.delete('/:id', deleteTicket)

export default router
