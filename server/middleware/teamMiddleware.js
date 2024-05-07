import Team from '../model/userModels/teamModel.js'
import { sendResponse } from '../utils/sendResponse.js'
import validateMongoDbId from '../utils/validateMongoDbId.js'

export const teamMiddleware = async (req, res, next) => {
  try {
    if (!req.query.userId || !validateMongoDbId(req.query.userId)) {
      return sendResponse(res, { message: 'No data found!' })
    }

    const searchFromTeam = await Team.findById(req?.query?.userId)
    if (searchFromTeam) {
      req.query.userId = searchFromTeam?.creatorId
      req.query.access = searchFromTeam?.access
      req.query.role = searchFromTeam?.role
      next()
    } else {
      next()
    }
  } catch (error) {
    next()
  }
}
