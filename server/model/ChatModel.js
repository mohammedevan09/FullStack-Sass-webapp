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
  },
  { timestamps: true }
)

const ChatSchema = new mongoose.Schema(
  {
    participants: [participantSchema],
    messages: [messageSchema],
  },
  { timestamps: true }
)

const Chat = mongoose.model('Chat', ChatSchema)

export default Chat
