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
      const comparedPass = bcrypt.compare(pass, findUser.password)
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

  const user = await User.findOne({ refreshToken })
  if (!user)
    return res.status(402).send('No refresh token present in db or not matched')
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user?.id !== decoded?.id) {
      return res.status(500).send('There is something wrong with refresh token')
    }
    const accessToken = generateToken(user?._id)
    return res.status(200).json({ accessToken })
  })
}

export const uploadProfilePicture = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (user?.profileImage) {
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
    const update = await User.findByIdAndUpdate(
      _id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    )

    const { password, refreshToken, ...userWithoutPassAndToken } = update._doc

    return res
      .status(200)
      .json({ ...userWithoutPassAndToken, token: generateToken(_id) })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  const { _id } = req.user
  try {
    const user = await User.findById(_id)

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
    const existedToken = await Token.findOne({ userId: _id })
    if (existedToken) {
      const token = await Token.findByIdAndUpdate(
        existedToken._id,
        {
          token: crypto.randomBytes(32).toString('hex'),
        },
        { new: true }
      )
      const url = `${process.env.BASE_URL}login/email_verify/${_id}?token=${token.token}`
      await sendEmail(
        email,
        'Verify Email',
        url,
        'Welcome, Please verify your email by clicking the button!'
      )
    } else {
      const token = await Token.create({
        userId: _id,
        token: crypto.randomBytes(32).toString('hex'),
      })
      const url = `${process.env.BASE_URL}login/email_verify/${_id}?token=${token.token}`
      await sendEmail(
        email,
        'Verify Email',
        url,
        'Welcome, Please verify your email by clicking the button!'
      )
    }
    return res.status(200).send('Email Send successfully!')
  } catch (error) {
    next(error)
  }
}

export const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (!user) return res.status(400).send({ message: 'Invalid link' })

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    })
    if (!token) return res.status(400).send({ message: 'Invalid link' })

    await User.findByIdAndUpdate(
      { _id: user?.id },
      {
        email_verified: true,
      },
      { new: true }
    )
    await Token.deleteOne({ _id: token._id })

    return res.status(200).send({ message: 'Email verified successfully' })
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const oldUser = await User.findOne({ email })
    if (!oldUser) {
      return res.status(404).json({ status: 'User Not Exists!!' })
    }
    const secret = process.env.JWT_SECRET + oldUser?.password
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '5m',
    })
    const link = `${process.env.BASE_URL}login/forgot-password/${oldUser._id}?token=${token}`
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

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params
  const { password: pass } = req.body
  console.log(pass)
  const oldUser = await User.findOne({ _id: id })
  if (!oldUser) {
    return res.status(404).json({ status: 'User Not Exists!!' })
  }
  const secret = process.env.JWT_SECRET + oldUser.password
  try {
    const verify = jwt.verify(token, secret)
    // console.log(verify)
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(pass, salt)
    const newRefreshToken = generateRefreshToken(verify?.id)
    const loggedUser = await User.findByIdAndUpdate(
      {
        _id: verify?.id,
      },
      {
        password: hashedPass,
        refreshToken: newRefreshToken,
      },
      { new: true }
    )

    const { password, refreshToken, ...userWithoutPassAndToken } =
      loggedUser._doc

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      ...userWithoutPassAndToken,
      token: generateToken(verify?.id),
    })
  } catch (error) {
    next(error)
  }
}
