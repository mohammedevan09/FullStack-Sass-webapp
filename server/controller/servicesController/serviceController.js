import fs from 'fs'
import Service from '../../model/serviceModels/serviceModel.js'
import {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} from '../../utils/cloudinary.js'
import { sendResponse } from '../../utils/sendResponse.js'
import { Types } from 'mongoose'

export const getAllServices = async (req, res, next) => {
  try {
    let query = {}

    if (req.query.isActive) {
      query.isActive = req.query.isActive === 'true'
    }
    if (req.query.__t) {
      query.__t = req.query.__t
    }

    const { search = '' } = req.query

    const totalDocsCount = await Service.countDocuments({
      ...query,
      $or: [
        { name: { $regex: new RegExp(search), $options: 'i' } },
        {
          _id: Types.ObjectId.isValid(search)
            ? new Types.ObjectId(search)
            : null,
        },
      ],
    })

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const services = await Service.aggregate([
      {
        $match: {
          ...query,
          $or: [
            { name: { $regex: new RegExp(search), $options: 'i' } },
            {
              _id: Types.ObjectId.isValid(search)
                ? new Types.ObjectId(search)
                : null,
            },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$__t',
          services: {
            $push: {
              _id: '$_id',
              name: '$name',
              heading: '$heading',
              isActive: '$isActive',
              icon: '$icon',
              creatorId: '$creatorId',
            },
          },
        },
      },
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

    const result = {
      services: formattedServices,
      totalDocsCount: totalDocsCount,
    }

    return sendResponse(res, result)
  } catch (error) {
    next(error)
  }
}

export const uploadImages = async (req, res, next) => {
  const { id } = req.params

  try {
    const service = await Service.findById(id)
    if (service?.icon) {
      const publicId = service?.icon.split('/').pop().split('.')[0]

      await cloudinaryDeleteImg(publicId)
    }

    const uploader = (path) => cloudinaryUploadImg(path, 'images')
    const urls = []
    const files = req.files

    for (const file of files) {
      const { path } = file
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }

    service.icon = urls[0]?.url
    service.save()

    return sendResponse(res, service)
  } catch (error) {
    next(error)
  }
}
