import express from 'express'

import {
  addChatParticipants,
  addMessageToChat,
  createChatMessage,
  removeChatParticipants,
  updateChatById,
} from '../../controller/chatController.js'
import ProposalChat from '../../model/proposalsModels/proposalsChatModel.js'
import { getChatByProposalId } from '../../controller/proposalsController/proposalChatController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await createChatMessage(req, res, next, ProposalChat)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', addMessageToChat)
router.get('/:proposalId', getChatByProposalId)
router.put('/update/:id', updateChatById)
router.put('/addParticipant/:id', authMiddleware, addChatParticipants)
router.put('/removeParticipant/:id', authMiddleware, removeChatParticipants)

export default router
