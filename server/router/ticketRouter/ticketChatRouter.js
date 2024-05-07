import express from 'express'

import {
  addChatParticipants,
  addMessageToChat,
  createChatMessage,
  updateChatById,
} from '../../controller/chatController.js'
import TicketChat from '../../model/tickerModels/ticketChatModels.js'
import { getChatByTicketId } from '../../controller/ticketController/ticketChatController.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await createChatMessage(req, res, next, TicketChat)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', addMessageToChat)
router.get('/:ticketId', getChatByTicketId)
router.put('/update/:id', updateChatById)
router.put('/addParticipant/:id', addChatParticipants)

export default router
