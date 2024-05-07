import express from 'express'

import {
  addChatParticipants,
  addMessageToChat,
  createChatMessage,
  updateChatById,
} from '../../controller/chatController.js'
import ProposalChat from '../../model/proposalsModels/proposalsChatModel.js'
import { getChatByProposalId } from '../../controller/proposalsController/proposalChatController.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await createChatMessage(req, res, next, ProposalChat)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', addMessageToChat)
router.get('/:ticketId', getChatByProposalId)
router.put('/update/:id', updateChatById)
router.put('/addParticipant/:id', addChatParticipants)

export default router
