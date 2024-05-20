import mongoose from 'mongoose'

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Object,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'low',
    },
    status: {
      type: String,
      enum: ['pending', 'running', 'done', 'canceled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model('Ticket', TicketSchema)
export default Ticket
