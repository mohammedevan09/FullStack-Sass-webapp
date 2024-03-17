import mongoose from 'mongoose'

const inputFieldsSchema = new mongoose.Schema(
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
  {
    _id: false,
    versionKey: false,
  }
)

const formSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    fields: [inputFieldsSchema],
  },
  {
    timestamps: true,
  }
)

const Form = mongoose.model('Form', formSchema)
export default Form
