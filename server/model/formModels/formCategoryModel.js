import mongoose from 'mongoose'

const FormCategorySchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const FormCategory = mongoose.model('FormCategory', FormCategorySchema)
export default FormCategory
