import fs from 'fs'
import Service from '../../model/serviceModels/serviceModel.js'
import { cloudinaryUploadImg } from '../../utils/cloudinary.js'

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find()

    const categorizedServices = services.reduce((acc, curr) => {
      const { __t } = curr
      if (!acc[__t]) {
        acc[__t] = []
      }
      acc[__t].push(curr)
      return acc
    }, {})

    const formattedServices = {
      Normal: categorizedServices.NormalService || [],
      Subscription: categorizedServices.SubscriptionService || [],
      Hourly: categorizedServices.HourlyService || [],
    }

    return res.status(200).json(formattedServices)
  } catch (error) {
    next(error)
  }
}

export const uploadImages = async (req, res, next) => {
  const { id } = req.params

  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images')
    const urls = []
    const files = req.files

    for (const file of files) {
      const { path } = file
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }

    const findProduct = await Service.findByIdAndUpdate(
      id,
      {
        icon: urls[0]?.url,
      },
      {
        new: true,
      }
    )
    return res.status(200).json(findProduct)
  } catch (error) {
    next(error)
  }
}
