import express from 'express'
import { getChatByOrderId } from '../../controller/orderController/orderChatController.js'
import {
  addChatParticipants,
  addMessageToChat,
  createChatMessage,
  updateChatById,
} from '../../controller/chatController.js'
import OrderChat from '../../model/orderModels/orderChatModel.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await createChatMessage(req, res, next, OrderChat)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', addMessageToChat)
router.get('/:orderId', getChatByOrderId)
router.put('/update/:id', updateChatById)
router.put('/addParticipant/:id', addChatParticipants)

export default router
