import { Types } from 'mongoose'
import fs from 'fs'
import bcrypt from 'bcrypt'
import generateToken from '../../config/jwtToken.js'
import generateRefreshToken from '../../config/refreshToken.js'
import User from '../../model/userModels/userModel.js'
import Token from '../../model/tokenModel.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../../utils/sendEmail.js'
import crypto from 'crypto'
import {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} from '../../utils/cloudinary.js'
import { sendResponse } from '../../utils/sendResponse.js'
import Team from '../../model/userModels/teamModel.js'

export const createUser = async (req, res, next) => {
  const { email, password: pass } = req.body
  try {
    const findUser = await User.findOne({ email })

    if (!findUser) {
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(pass, salt)

      const newUser = await User.create({ ...req.body, password: hashedPass })

      const newRefreshToken = generateRefreshToken(newUser?._id)

      const registeredUser = await User.findByIdAndUpdate(
        newUser?.id,
        {
          refreshToken: newRefreshToken,
        },
        { new: true }
      )

      const { password, refreshToken, ...userWithoutPassAndToken } =
        registeredUser._doc

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })

      return res.status(200).json({
        ...userWithoutPassAndToken,
        token: generateToken(newUser?._id),
      })
    } else {
      return res.status(401).send('User Already Exists')
    }
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  const { email, password: pass } = req.body
  const findUser = await User.findOne({ email })
  try {
    if (findUser) {
      const comparedPass = await bcrypt.compare(pass, findUser.password)
      if (comparedPass) {
        const newRefreshToken = generateRefreshToken(findUser?._id)
        const loggedUser = await User.findByIdAndUpdate(
          findUser.id,
          {
            refreshToken: newRefreshToken,
          },
          { new: true }
        )

        const { password, refreshToken, ...userWithoutPassAndToken } =
          loggedUser._doc

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

export const googleLoginUser = async (req, res, next) => {
  const { email } = req.body
  const findUser = await User.findOne({ email })
  try {
    if (findUser) {
      const refreshTokenNew = generateRefreshToken(findUser?._id)

      const updateFields = {
        refreshToken: refreshTokenNew,
        email_verified: req.body?.email_verified,
        email: req.body?.email,
        fullName: req.body?.fullName,
      }

      if (!findUser.profileImage || findUser.profileImage === '') {
        updateFields.profileImage = req.body.profileImage
      }

      const loggedUser = await User.findByIdAndUpdate(
        findUser.id,
        updateFields,
        { new: true }
      )

      const { password, refreshToken, ...logUserWithoutPassAndToken } =
        loggedUser._doc

      res.cookie('refreshToken', refreshTokenNew, {
        httpOnly: true,
        secure: true,
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })

      return res.status(200).json({
        ...logUserWithoutPassAndToken,
        token: generateToken(findUser?._id),
      })
    } else {
      const newUser = await User.create({ ...req.body })

      const newRefreshToken = generateRefreshToken(newUser?._id)

      const registeredUser = await User.findByIdAndUpdate(
        newUser?.id,
        {
          refreshToken: newRefreshToken,
        },
        { new: true }
      )

      const { password, refreshToken, ...newUserWithoutPassAndToken } =
        registeredUser._doc

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })

      return res.status(200).json({
        ...newUserWithoutPassAndToken,
        token: generateToken(newUser?._id),
      })
    }
  } catch (error) {
    next(error)
  }
}

export const logoutUser = (req, res, next) => {
  //   const cookie = req.cookies
  //   console.log(cookie.refreshToken)
  try {
    res.clearCookie('refreshToken')
    return res.status(200).send('Logout successful')
  } catch (error) {
    next(error)
  }
}

export const adminLogin = async (req, res, next) => {
  const { email, password: pass } = req.body
  const findUser = await User.findOne({ email, role: 'admin' })
  try {
    if (findUser) {
      const comparedPass = await bcrypt.compare(pass, findUser.password)
      if (comparedPass) {
        const newRefreshToken = generateRefreshToken(findUser?._id)
        const loggedUser = await User.findByIdAndUpdate(
          findUser.id,
          {
            refreshToken: newRefreshToken,
          },
          { new: true }
        )

        const { password, refreshToken, ...userWithoutPassAndToken } =
          loggedUser._doc

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
      return res.status(401).send('No admin found')
    }
  } catch (error) {
    next(error)
  }
}

export const handleRefreshToken = async (req, res) => {
  // const cookie = req.cookies
  // if (!cookie.refreshToken)
  //   return res.status(401).send('No Refresh token in Cookies!')

  // const refreshToken = cookie.refreshToken
  //   console.log(refreshToken)

  const { refreshToken } = req.query

  let user = await User.findOne({ refreshToken })

  if (!user) {
    user = await Team.findOne({ refreshToken })
  }

  if (!user) {
    return res.status(402).send('No refresh token present in db or not matched')
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user?.id !== decoded?.id) {
      return res.status(500).send('There is something wrong with refresh token')
    }
    const accessToken = generateToken(user?._id)
    return res.status(200).json({ accessToken })
  })
}

export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query

    const pageInt = parseInt(page)
    const limitInt = parseInt(limit)

    const matchStage = {
      $match: {
        role: 'user',
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
          users: [
            { $project: { refreshToken: 0, password: 0 } },
            { $sort: { createdAt: -1 } },
            { $skip: (pageInt - 1) * limitInt },
            { $limit: limitInt },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
    ]

    const results = await User.aggregate(pipeline)

    const users = results[0].users
    const totalCount = results[0].totalCount[0]?.count || 0

    return res.status(200).json({
      success: true,
      data: users,
      totalPages: Math.ceil(totalCount / limitInt),
      currentPage: pageInt,
      totalDocsCount: totalCount,
    })
  } catch (error) {
    next(error)
  }
}

export const uploadProfilePicture = async (req, res, next) => {
  const { id } = req.params

  try {
    let model
    let user = await User.findById(id)
    if (!user) {
      user = await Team.findById(id)
      if (!user) {
        return res.status(404).json({ message: 'User or Team not found' })
      }
      model = Team
    } else {
      model = User
    }

    if (user.profileImage) {
      const publicId = user.profileImage.split('/').pop().split('.')[0]
      await cloudinaryDeleteImg(publicId)
    }

    const uploader = (path) => cloudinaryUploadImg(path, 'images')
    const urls = []
    const files = req.files

    await Promise.all(
      files.map(async (file) => {
        const newPath = await uploader(file.path)
        urls.push(newPath)
        fs.unlinkSync(file.path)
      })
    )

    user.profileImage = urls[0]?.url
    await user.save()

    const { password, refreshToken, ...userWithoutPassAndToken } = user._doc

    return sendResponse(res, userWithoutPassAndToken)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  const { _id } = req.user
  try {
    let update = await User.findByIdAndUpdate(
      _id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    )

    if (!update) {
      update = await Team.findByIdAndUpdate(
        _id,
        {
          ...req.body,
        },
        {
          new: true,
        }
      )
      if (!update) {
        return res.status(404).json({ message: 'User or Team not found' })
      }
    }

    const { password, refreshToken, ...userWithoutPassAndToken } = update._doc

    return res
      .status(200)
      .json({ ...userWithoutPassAndToken, token: generateToken(_id) })
  } catch (error) {
    next(error)
  }
}

export const blockUser = async (req, res, next) => {
  const { id } = req.params
  try {
    let update = await User.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    )
    return res.status(200).json({ message: 'Deleted Successfully' })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  const { _id } = req.user
  try {
    let user = await User.findById(_id)
    if (!user) {
      user = await Team.findById(_id)
      if (!user) {
        return res.status(404).json({ message: 'User or Team not found' })
      }
    }

    const { password, refreshToken, ...userWithoutPassAndToken } = user._doc

    return res
      .status(200)
      .json({ ...userWithoutPassAndToken, token: generateToken(_id) })
  } catch (error) {
    next(error)
  }
}

export const sendVerifyEmail = async (req, res, next) => {
  const { email, _id } = req.body

  try {
    const user = await User.findOne({ _id })
    if (!user) {
      const team = await Team.findOne({ _id })
      if (!team) {
        return res.status(404).json({ status: 'User or Team Not Found' })
      }
    }

    const tokenData = { userId: _id }
    let token = await Token.findOne(tokenData)
    if (!token) {
      token = await Token.create({
        ...tokenData,
        token: crypto.randomBytes(32).toString('hex'),
      })
    } else {
      token.token = crypto.randomBytes(32).toString('hex')
      await token.save()
    }

    const url = `${process.env.BASE_URL}/login/email_verify/${_id}?token=${token.token}`
    await sendEmail(
      email,
      'Verify Email',
      url,
      'Welcome, Please verify your email by clicking the button!'
    )

    return res.status(200).send('Email Send successfully!')
  } catch (error) {
    next(error)
  }
}

export const verifyEmail = async (req, res, next) => {
  try {
    const { id, token } = req.params
    const user = await User.findOne({ _id: id })
    if (!user) {
      const team = await Team.findOne({ _id: id })
      if (!team) {
        return res.status(404).json({ message: 'Invalid User or Team' })
      }
    }

    const tokenData = { userId: id, token }
    const tokenDoc = await Token.findOneAndDelete(tokenData)
    if (!tokenDoc) {
      return res.status(400).json({ message: 'Invalid link' })
    }

    const Model = user ? User : Team
    await Model.findByIdAndUpdate(
      { _id: id },
      {
        email_verified: true,
      }
    )

    return res.status(200).send({ message: 'Email verified successfully' })
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    let team
    if (!user) {
      team = await Team.findOne({ email })
      if (!team) {
        return res.status(404).json({ status: 'User or Team Not Found' })
      }
    }

    const secret =
      process.env.JWT_SECRET + (user ? user.password : team.password)
    const token = jwt.sign({ email, id: user ? user._id : team._id }, secret, {
      expiresIn: '5m',
    })
    const link = `${process.env.BASE_URL}/login/forgot-password/${
      user ? user._id : team._id
    }?token=${token}`
    await sendEmail(
      email,
      'Reset Password',
      link,
      'Welcome, Please reset your password by clicking here!',
      'Reset Password'
    )

    res.status(200).send('Password reset email send!')
  } catch (error) {
    next(error)
  }
}

const getPassword = async (id) => {
  const user = await User.findOne({ _id: id })
  if (user) return user.password
  const team = await Team.findOne({ _id: id })
  return team.password
}

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params
  const { password: pass } = req.body

  try {
    const secret = process.env.JWT_SECRET + (await getPassword(id))
    const verify = jwt.verify(token, secret)

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(pass, salt)
    const newRefreshToken = generateRefreshToken(verify.id)

    const Model = verify.email ? User : Team
    const user = await Model.findByIdAndUpdate(
      { _id: verify.id },
      {
        password: hashedPass,
        refreshToken: newRefreshToken,
      },
      { new: true }
    )

    const { password, refreshToken, ...userWithoutPassAndToken } = user._doc

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      ...userWithoutPassAndToken,
      token: generateToken(verify.id),
    })
  } catch (error) {
    next(error)
  }
}
