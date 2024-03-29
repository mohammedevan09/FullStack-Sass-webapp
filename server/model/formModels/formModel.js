import mongoose from 'mongoose'

const inputFieldsSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
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
    optional: Boolean,
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
    formCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FormCategory',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: Object,
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
