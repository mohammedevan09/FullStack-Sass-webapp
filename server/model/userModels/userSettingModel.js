import mongoose from 'mongoose'

const notificationTypes = {
  message: { type: Boolean, default: true },
  project: { type: Boolean, default: true },
  ticket: { type: Boolean, default: true },
  invoiceAndProposal: { type: Boolean, default: true },
  subscription: { type: Boolean, default: true },
  meeting: { type: Boolean, default: true },
}

const UserSettingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    emailNotification: notificationTypes,
  },
  {
    timestamps: true,
  }
)

const UserSetting = mongoose.model('UserSetting', UserSettingSchema)
export default UserSetting
