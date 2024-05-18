import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'Chat',
        'Order',
        'Proposal',
        'Ticket',
        'Invoice',
        'Meeting',
        'Affiliate',
        'User',
        'Team',
      ],
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    readByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Notification = mongoose.model('Notification', NotificationSchema)
export default Notification
