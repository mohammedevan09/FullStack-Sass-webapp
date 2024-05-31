import Order from '../../model/orderModels/orderModel.js'
import NormalService from '../../model/serviceModels/normalServicePlanModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createNormalService = async (req, res, next) => {
  try {
    const newNormalService = await NormalService.create({
      ...req.body,
      creatorId: req.user?._id,
    })
    return res.status(200).json(newNormalService)
  } catch (error) {
    next(error)
  }
}

export const updateNormalService = async (req, res, next) => {
  try {
    const update = await NormalService.findOneAndUpdate(
      { _id: req.params.id, creatorId: req.user?._id },
      { $set: { ...req.body } },
      { new: true }
    ).populate('form')

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
    const services = await NormalService.findById({
      _id: req.params.id,
    }).populate('form')
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const getNormalServiceByUserId = async (req, res, next) => {
  try {
    const services = await NormalService.find({
      creatorId: req.params.id,
    }).populate('form')
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const deleteNormalServiceById = async (req, res, next) => {
  try {
    const orders = await Order.countDocuments({ serviceId: req.params.id })

    if (orders > 0) {
      return res.status(405).json({ message: 'The service is in use.' })
    }

    const deletedService = await NormalService.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.user?._id,
    })

    if (deletedService) {
      return sendResponse(res, { message: 'Deleted Successfully' })
    } else {
      return sendResponse(res)
    }
  } catch (error) {
    console.error('Error deleting subscription service:', error)
    next(error)
  }
}
