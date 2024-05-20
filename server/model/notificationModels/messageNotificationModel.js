import mongoose from 'mongoose'

const MessageNotificationSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ['Order', 'Proposal', 'Ticket'],
      required: true,
    },
    title: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    sender: {
      senderType: {
        type: String,
        enum: ['User', 'Team'],
        required: true,
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    idDetails: {},
    receivers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ['User', 'Team'],
        },
        read: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const MessageNotification = mongoose.model(
  'MessageNotification',
  MessageNotificationSchema
)
export default MessageNotification
