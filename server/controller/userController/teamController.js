import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { sendResponse } from '../../utils/sendResponse.js'
import Team from '../../model/userModels/teamModel.js'
import generateRefreshToken from '../../config/refreshToken.js'
import generateToken from '../../config/jwtToken.js'

export const createTeam = async (req, res, next) => {
  const { email, password: pass } = req.body
  try {
    const findUser = await Team.findOne({ email })

    if (!findUser) {
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(pass, salt)

      const newUser = await Team.create({
        ...req.body,
        password: hashedPass,
      })

      return sendResponse(res, newUser)
    } else {
      return res.status(401).send('User Already Exists')
    }
  } catch (error) {
    next(error)
  }
}

export const loginTeam = async (req, res, next) => {
  const { email, password: pass } = req.body
  const findUser = await Team.findOne({ email })
  try {
    if (findUser) {
      const comparedPass = await bcrypt.compare(pass, findUser.password)
      if (comparedPass) {
        const newRefreshToken = generateRefreshToken(findUser?._id)
        const loggedUser = await Team.findByIdAndUpdate(
          findUser._id,
          {
            refreshToken: newRefreshToken,
          },
          { new: true }
        )

        const {
          password,
          refreshToken,
          originalPass,
          ...userWithoutPassAndToken
        } = loggedUser._doc

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 90 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
          ...userWithoutPassAndToken,
          token: generateToken(findUser?._id),
        })
      } else {
        return res.status(400).send('Password did not match!')
      }
    } else {
      return res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    next(error)
  }
}

export const giveAccessTeam = async (req, res, next) => {
  const { accessType, _id } = req.body

  try {
    const user = await Team.findById(req.params.id)

    const isAlreadyHaveAccess =
      user?.access?.[accessType]?.accessOf?.includes(_id)

    if (isAlreadyHaveAccess) {
      return res.status(201).json({ message: 'Already has access' })
    } else {
      user.access[accessType].accessOf.push(_id)
      await user.save()
    }

    const { password, refreshToken, originalPass, ...userWithoutPassAndToken } =
      user._doc

    return sendResponse(res, userWithoutPassAndToken)
  } catch (error) {
    next(error)
  }
}

export const removeAccessTeam = async (req, res, next) => {
  const { accessType, _id } = req.body

  try {
    const user = await Team.findById(req.params.id)

    const accessIndex = user?.access?.[accessType]?.accessOf.findIndex(
      (accessId) => accessId?.toString() === _id
    )

    if (accessIndex === -1) {
      return res.status(201).json({ message: 'Access already removed' })
    }

    user.access[accessType].accessOf.splice(accessIndex, 1)
    await user.save()

    const { password, refreshToken, originalPass, ...userWithoutPassAndToken } =
      user._doc

    return sendResponse(res, userWithoutPassAndToken)
  } catch (error) {
    next(error)
  }
}

export const getAllTeams = async (req, res, next) => {
  try {
    const { creatorId } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit

    const aggregationPipeline = [
      { $match: { creatorId: new mongoose.Types.ObjectId(creatorId) } },
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: { password: 0, refreshToken: 0 } },
    ]

    const users = await Team.aggregate(aggregationPipeline)

    return sendResponse(res, users)
  } catch (error) {
    next(error)
  }
}

export const getTeamById = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await Team.findById(id)
    const { password, refreshToken, originalPass, ...userWithoutPassAndToken } =
      user._doc
    return sendResponse(res, userWithoutPassAndToken)
  } catch (error) {
    next(error)
  }
}

export const updateTeam = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await Team.findByIdAndUpdate(id, req.body, { new: true })

    const { password, refreshToken, originalPass, ...userWithoutPassAndToken } =
      user._doc

    return sendResponse(res, userWithoutPassAndToken)
  } catch (error) {
    next(error)
  }
}

export const deleteTeam = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await Team.findByIdAndDelete(id)
    return sendResponse(res, user)
  } catch (error) {
    next(error)
  }
}
