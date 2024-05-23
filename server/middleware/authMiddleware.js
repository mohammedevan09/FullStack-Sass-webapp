import jwt from 'jsonwebtoken'
import User from '../model/userModels/userModel.js'
import Team from '../model/userModels/teamModel.js'

export const authMiddleware = async (req, res, next) => {
  let token
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    // console.log(token)
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        let user = await User.findById(decoded?.id)
        if (!user) {
          user = await Team.findById(decoded?.id)
          if (!user) {
            return res.status(404).json({ message: 'User or Team not found' })
          }
        }
        req.user = user
        next()
      }
    } catch (error) {
      res.status(498)
      next(error)
    }
  } else {
    return res.status(500).send('There is not token attachment to header')
  }
}

export const isAdmin = async (req, res, next) => {
  if (req.user?.role === 'admin' || req.user?.role === 'adminMember') {
    next()
  } else {
    return res.status(403).json({ message: 'You are not an admin' })
  }
}
