import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import { sendResponse } from '../../utils/sendResponse.js'
import Team from '../../model/userModels/teamModel.js'
import generateRefreshToken from '../../config/refreshToken.js'
import generateToken from '../../config/jwtToken.js'
import {
  emailNotification,
  teamMemberNotification,
} from '../../utils/sendNotificationEmail.js'

export const createTeam = async (req, res, next) => {
  if (req.user?.role === 'userMember' || req.user?.role === 'adminMember') {
    return res
      .status(500)
      .json({ message: 'Team members not allowed to create Team!' })
  }

  const { email, password: pass } = req.body
  try {
    const findUser = await Team.findOne({ email })

    if (!findUser) {
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(pass, salt)

      const newUser = await Team.create({
        ...req.body,
        creatorId: req.user?._id,
        password: hashedPass,
      })

      const { fullName, email, originalPass } = newUser

      await emailNotification(
        email,
        `New Team Member - ${fullName}`,
        teamMemberNotification(fullName, email, originalPass)
      )

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

        res.cookie(
          findUser?.role === 'userMember'
            ? 'refreshToken'
            : 'adminRefreshToken',
          newRefreshToken,
          {
            httpOnly: true,
            secure: true,
            maxAge: 90 * 24 * 60 * 60 * 1000,
          }
        )

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
    const user = await Team.findOne({
      _id: req.params.id,
      creatorId: req.user?._id,
    })

    const isAlreadyHaveAccess =
      user?.access?.[accessType]?.accessOf?.includes(_id)

    if (isAlreadyHaveAccess) {
      return res.status(201).json({ message: 'Already has access' })
    } else {
      user.access[accessType].accessOf.push(_id)
      await user.save()
    }

    return sendResponse(res, { message: 'Access Granted' })
  } catch (error) {
    next(error)
  }
}

export const removeAccessTeam = async (req, res, next) => {
  const { accessType, _id } = req.body

  try {
    const user = await Team.findOne({
      _id: req.params.id,
      creatorId: req.user?._id,
    })

    const accessIndex = user?.access?.[accessType]?.accessOf.findIndex(
      (accessId) => accessId?.toString() === _id
    )

    if (accessIndex === -1) {
      return res.status(201).json({ message: 'Access already removed' })
    }

    user.access[accessType].accessOf.splice(accessIndex, 1)
    await user.save()

    return sendResponse(res, { message: 'Access Removed' })
  } catch (error) {
    next(error)
  }
}

export const getAllTeams = async (req, res, next) => {
  try {
    const { creatorId } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const skip = (page - 1) * limit

    const matchStage = {
      $match: {
        creatorId: new Types.ObjectId(creatorId),
        $or: [
          { fullName: { $regex: new RegExp(search, 'i') } },
          { email: { $regex: new RegExp(search, 'i') } },
          {
            _id: Types.ObjectId.isValid(search)
              ? new Types.ObjectId(search)
              : null,
          },
        ],
      },
    }

    const pipeline = [
      matchStage,
      {
        $facet: {
          teams: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: limit },
            { $project: { password: 0, refreshToken: 0 } },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
    ]

    const results = await Team.aggregate(pipeline)

    const teams = results[0].teams
    const totalDocsCount = results[0].totalCount[0]?.count || 0

    return res.status(200).json({
      success: true,
      users: teams,
      totalPages: Math.ceil(totalDocsCount / limit),
      currentPage: page,
      totalDocsCount,
    })
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
    await Team.findOneAndDelete({
      _id: id,
      creatorId: req.user?._id,
    })
    return sendResponse(res, { message: 'Deleted team member successfully' })
  } catch (error) {
    next(error)
  }
}
