import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
    },
    number: {
      type: String,
      default: '',
    },
    company_name: {
      type: String,
      default: '',
    },
    company_website: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['subUser', 'user', 'subAdmin', 'admin', 'superAdmin'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    referredBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', UserSchema)
export default User
