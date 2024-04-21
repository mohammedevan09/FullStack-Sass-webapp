import { sendResponse } from '../utils/sendResponse.js'
import Guide from '../model/guideModel.js'

export const createGuide = async (req, res, next) => {
  try {
    const data = await Guide.create(req.body)

    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const getAllGuides = async (req, res, next) => {
  try {
    const data = await Guide.find().sort({ createdAt: -1 })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const getGuideById = async (req, res, next) => {
  try {
    const data = await Guide.findById({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateGuide = async (req, res, next) => {
  try {
    const data = await Guide.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const deleteGuide = async (req, res, next) => {
  try {
    const data = await Guide.findByIdAndDelete({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
