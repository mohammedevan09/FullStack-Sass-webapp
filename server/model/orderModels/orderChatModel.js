import mongoose from 'mongoose'
import Chat from '../ChatModel.js'

const orderChatSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const OrderChat = Chat.discriminator('OrderChat', orderChatSchema)

export default OrderChat
