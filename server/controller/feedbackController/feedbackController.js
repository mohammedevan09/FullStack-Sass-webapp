import Feedback from '../../model/feedbackModels/feedbackModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createFeedback = async (req, res, next) => {
  try {
    const data = await Feedback.create(req.body)

    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const getAllFeedback = async (req, res, next) => {
  try {
    let { page = 1, limit, categoryId } = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    let query = {}

    if (categoryId) {
      query.feedbackCategoryId = categoryId
    }

    const feedback = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'userId',
        select: '_id fullName email number profileImage',
      })
      .exec()

    return sendResponse(res, feedback)
  } catch (error) {
    next(error)
  }
}

export const getFeedbackById = async (req, res, next) => {
  try {
    const data = await Feedback.findById({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateFeedback = async (req, res, next) => {
  try {
    const data = await Feedback.findByIdAndUpdate(
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

export const deleteFeedback = async (req, res, next) => {
  try {
    const data = await Feedback.findByIdAndDelete({
      _id: req.params.id,
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
