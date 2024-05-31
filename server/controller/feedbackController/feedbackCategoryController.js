import FeedbackCategory from '../../model/feedbackModels/feedbackCategory.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createFeedbackCategory = async (req, res, next) => {
  try {
    const data = await FeedbackCategory.create({
      ...req.body,
      creatorId: req.user._id,
    })

    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const getAllFeedbackCategories = async (req, res, next) => {
  try {
    const data = await FeedbackCategory.find().sort({ createdAt: -1 })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const getFeedbackCategoryById = async (req, res, next) => {
  try {
    const data = await FeedbackCategory.findById({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateFeedbackCategory = async (req, res, next) => {
  try {
    const data = await FeedbackCategory.findOneAndUpdate(
      { _id: req.params.id, creatorId: req.user._id },
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

export const deleteFeedbackCategory = async (req, res, next) => {
  try {
    const data = await FeedbackCategory.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.user._id,
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
