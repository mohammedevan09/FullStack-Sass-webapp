import express from 'express'
import {
  addMessageToOrderChat,
  createOrderChatMessage,
  getChatByOrderId,
} from '../../controller/orderController/orderChatController.js'

const router = express.Router()

router.post('/', createOrderChatMessage)
router.put('/:id', addMessageToOrderChat)
router.get('/:orderId', getChatByOrderId)

export default router
