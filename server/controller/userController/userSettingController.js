import User from '../../model/userModels/userModel.js'
import UserSetting from '../../model/userModels/userSettingModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const findOrCreateUserSettings = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    let userSettings = await UserSetting.findOneAndUpdate(
      { userId: user._id },
      { userId: user._id },
      { upsert: true, new: true }
    )

    return sendResponse(res, userSettings)
  } catch (error) {
    next(error)
  }
}

export const updateUserSetting = async (req, res, next) => {
  try {
    const update = await UserSetting.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user?._id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    )

    return sendResponse(res, update)
  } catch (error) {
    next(error)
  }
}
