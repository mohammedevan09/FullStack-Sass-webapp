import Team from '../model/userModels/teamModel.js'
import User from '../model/userModels/userModel.js'
import validateMongoDbId from '../utils/validateMongoDbId.js'

export const teamMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.query

    if (!userId || !validateMongoDbId(userId)) {
      return res.status(404).json({ message: 'No User found!' })
    }

    const team = await Team.findById(userId)
    if (team) {
      req.query = {
        ...req.query,
        userId: team.creatorId,
        access: team.access,
        role: team.role,
      }
      return next()
    }

    const userExists = await User.exists({ _id: userId })
    if (userExists) {
      req.query = {
        ...req.query,
        userId: userExists.creatorId,
        role: userExists.role,
      }
      return next()
    }

    return res.status(404).json({ message: 'No User found!' })
  } catch (error) {
    return next(error)
  }
}
