import jwt from 'jsonwebtoken'
import User from '../model/userModels/userModel.js'

export const authMiddleware = async (req, res, next) => {
  let token
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    // console.log(token)
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        const user = await User.findById(decoded?.id)
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
  const { email } = req.user
  const adminUser = await User.findOne({ email })
  // console.log(adminUser)
  if (adminUser?.role !== 'admin') {
    next('You are not admin!')
  } else {
    next()
  }
}
