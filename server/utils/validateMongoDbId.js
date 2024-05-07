import mongoose from 'mongoose'

const validateMongoDbId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

export default validateMongoDbId
