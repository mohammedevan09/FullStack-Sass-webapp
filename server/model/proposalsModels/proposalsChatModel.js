import mongoose from 'mongoose'
import Chat from '../ChatModel.js'

const ProposalChatSchema = new mongoose.Schema(
  {
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const ProposalChat = Chat.discriminator('ProposalChat', ProposalChatSchema)

export default ProposalChat
