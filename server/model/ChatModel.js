import mongoose from 'mongoose'

const participantSchema = new mongoose.Schema({
  participantType: {
    type: String,
    enum: ['User', 'Team'],
    required: true,
  },
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

const senderSchema = new mongoose.Schema({
  senderType: {
    type: String,
    enum: ['User', 'Team'],
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

export const messageSchema = new mongoose.Schema(
  {
    sender: senderSchema,
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    seenBy: [{ type: participantSchema }],
  },
  { timestamps: true }
)

const ChatSchema = new mongoose.Schema(
  {
    participants: [participantSchema],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  { timestamps: true }
)

export const Message = mongoose.model('Message', messageSchema)
const Chat = mongoose.model('Chat', ChatSchema)

export default Chat
