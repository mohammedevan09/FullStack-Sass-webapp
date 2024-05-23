import SubscriptionService from '../../model/serviceModels/subscriptionServiceModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createSubscriptionService = async (req, res, next) => {
  try {
    const newSubscriptionService = await SubscriptionService.create({
      ...req.body,
      creatorId: req.user?._id,
    })
    return res.status(200).json(newSubscriptionService)
  } catch (error) {
    next(error)
  }
}

export const updateSubscriptionService = async (req, res, next) => {
  try {
    const update = await SubscriptionService.findOneAndUpdate(
      { _id: req.params.id, creatorId: req.user?._id },
      { $set: { ...req.body } },
      { new: true }
    ).populate('form')
    return sendResponse(res, update)
  } catch (error) {
    next(error)
  }
}

export const getAllSubscriptionServices = async (req, res, next) => {
  try {
    const services = await SubscriptionService.find()
    return res.status(200).json(services)
  } catch (error) {
    next(error)
  }
}

export const getSubscriptionServiceById = async (req, res, next) => {
  try {
    const services = await SubscriptionService.findById({
      _id: req.params.id,
    }).populate('form')
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const getSubscriptionServiceByUserId = async (req, res, next) => {
  try {
    const services = await SubscriptionService.find({
      creatorId: req.params.id,
    }).populate('form')
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const deleteSubscriptionServiceById = async (req, res, next) => {
  try {
    const deletedService = await SubscriptionService.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.user?._id,
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
