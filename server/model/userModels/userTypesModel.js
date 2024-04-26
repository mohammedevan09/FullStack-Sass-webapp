import mongoose from 'mongoose'
import User from './userModel.js'

const accessTypes = {
  services: { type: Boolean, default: false },
  orders: { type: Boolean, default: false },
  proposals: { type: Boolean, default: false },
  invoice: { type: Boolean, default: false },
  meetings: { type: Boolean, default: false },
  settings: { type: Boolean, default: false },
}

const SubUserSchema = new mongoose.Schema(
  {
    access: accessTypes,
    originalPass: String,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const SubUser = User.discriminator('SubUser', SubUserSchema)
export default SubUser
