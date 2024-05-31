import express from 'express'

import {
  addChatParticipants,
  addMessageToChat,
  createChatMessage,
  removeChatParticipants,
  updateChatById,
} from '../../controller/chatController.js'
import TicketChat from '../../model/ticketModels/ticketChatModels.js'
import { getChatByTicketId } from '../../controller/ticketController/ticketChatController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    await createChatMessage(req, res, next, TicketChat)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', authMiddleware, addMessageToChat)
router.get('/:ticketId', getChatByTicketId)
router.put('/update/:id', authMiddleware, updateChatById)
router.put('/addParticipant/:id', authMiddleware, addChatParticipants)
router.put('/removeParticipant/:id', authMiddleware, removeChatParticipants)

export default router
