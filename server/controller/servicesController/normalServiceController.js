import fs from 'fs'
import NormalService from '../../model/serviceModels/normalServicePlanModal.js'
import {
  cloudinaryUploadImg,
  deleteImageByUrl,
} from '../../utils/cloudinary.js'

export const createNormalService = async (req, res, next) => {
  try {
    // console.log(req.files, req.body)
    const { path } = req.files[0]
    const uploader = await cloudinaryUploadImg(path)

    const newNormalService = await NormalService.create({
      ...JSON.parse(req.body?.data),
      icon: uploader?.url,
    })

    fs.unlink(path, (err) => {})

    return res.status(200).json(newNormalService)
  } catch (error) {
    next(error)
  }
}

export const updateNormalService = async (req, res, next) => {
  try {
    let update
    const { path } = req.files[0]

    const uploader = await cloudinaryUploadImg(path)
    update = await NormalService.findByIdAndUpdate(
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
