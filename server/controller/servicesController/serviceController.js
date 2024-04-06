import fs from 'fs'
import Service from '../../model/serviceModels/serviceModel.js'
import { cloudinaryUploadImg } from '../../utils/cloudinary.js'

export const getAllServices = async (req, res, next) => {
  try {
    let query = {}

    if (req.query.isActive) {
      query.isActive = req.query.isActive === 'true'
    }
    if (req.query.__t) {
      query.__t = req.query.__t
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit

    const services = await Service.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$__t', services: { $push: '$$ROOT' } } },
      {
        $project: {
          _id: 0,
          serviceType: '$_id',
          services: {
            $slice: ['$services', skip, limit],
          },
        },
      },
    ])

    const formattedServices = services.reduce((acc, curr) => {
      acc[curr.serviceType] = curr.services
      return acc
    }, {})

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
