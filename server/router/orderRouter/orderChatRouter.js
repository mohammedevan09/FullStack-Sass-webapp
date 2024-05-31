import express from 'express'
import { getChatByOrderId } from '../../controller/orderController/orderChatController.js'
import {
  addChatParticipants,
  addMessageToChat,
  createChatMessage,
  removeChatParticipants,
  updateChatById,
} from '../../controller/chatController.js'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    await createChatMessage(req, res, next, OrderChat)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', authMiddleware, addMessageToChat)
router.get('/:orderId', getChatByOrderId)
router.put('/update/:id', authMiddleware, updateChatById)
router.put('/addParticipant/:id', authMiddleware, addChatParticipants)
router.put('/removeParticipant/:id', authMiddleware, removeChatParticipants)

export default router
