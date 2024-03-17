import NormalService from '../../model/serviceModels/normalServicePlanModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createNormalService = async (req, res, next) => {
  try {
    const newNormalService = await NormalService.create(req.body)
    return res.status(200).json(newNormalService)
  } catch (error) {
    next(error)
  }
}

export const updateNormalService = async (req, res, next) => {
  try {
    const update = await NormalService.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )
    return sendResponse(res, update)
  } catch (error) {
    next(error)
  }
}

export const getAllNormalServices = async (req, res, next) => {
  try {
    const services = await NormalService.find()
    return res.status(200).json(services)
  } catch (error) {
    next(error)
  }
}

export const getNormalServiceById = async (req, res, next) => {
  try {
    const services = await NormalService.findById({ _id: req.params.id })
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const getNormalServiceByUserId = async (req, res, next) => {
  try {
    const services = await NormalService.find({ creatorId: req.params.id })
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const deleteNormalServiceById = async (req, res, next) => {
  try {
    const deletedService = await NormalService.findByIdAndDelete({
      _id: req.params.id,
    })

    if (deletedService) {
      return sendResponse(res, { message: 'Deleted Successfully' })
    } else {
      return sendResponse(res)
    }
  } catch (error) {
    next(error)
  }
}
