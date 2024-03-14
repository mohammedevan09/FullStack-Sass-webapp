import mongoose from 'mongoose'

const formSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fields: [
      {
        label: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        placeholder: {
          type: String,
          default: '',
        },
        validation: {},
        options: [
          {
            label: {
              type: String,
            },
            value: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
)

const ServiceSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Service = mongoose.model('Service', ServiceSchema)
export default Service
