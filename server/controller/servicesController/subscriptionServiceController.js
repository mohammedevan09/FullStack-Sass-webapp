import fs from 'fs'
import {
  cloudinaryUploadImg,
  deleteImageByUrl,
} from '../../utils/cloudinary.js'
import SubscriptionService from '../../model/serviceModels/subscriptionServiceModal.js'

export const createSubscriptionService = async (req, res, next) => {
  try {
    // console.log(req.files, req.body)
    const { path } = req.files[0]
    const uploader = await cloudinaryUploadImg(path)

    const newSubscriptionService = await SubscriptionService.create({
      ...JSON.parse(req.body?.data),
      icon: uploader?.url,
    })

    fs.unlink(path, (err) => {})

    return res.status(200).json(newSubscriptionService)
  } catch (error) {
    next(error)
  }
}

export const updateSubscriptionService = async (req, res, next) => {
  try {
    let update
    const { path } = req.files[0]

    const uploader = await cloudinaryUploadImg(path)
    update = await SubscriptionService.findByIdAndUpdate(
      { _id: JSON.parse(req.body?.data)?._id },
      {
        ...JSON.parse(req.body?.data),
        icon: uploader?.url,
      },
      { new: true }
    )

    await deleteImageByUrl(JSON.parse(req.body?.data)?.icon)
    fs.unlink(path, (err) => {})

    return res.status(200).json(update)
  } catch (error) {
    next(error)
  }
}
