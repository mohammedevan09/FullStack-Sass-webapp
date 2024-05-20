import mongoose from 'mongoose'
import Chat from '../ChatModel.js'

const TicketChatSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const TicketChat = Chat.discriminator('TicketChat', TicketChatSchema)

export default TicketChat
