import FormCategory from '../../model/formModels/formCategoryModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createFormCategory = async (req, res, next) => {
  try {
    const form = await FormCategory.create(req.body)
    return res.status(200).json(form)
  } catch (error) {
    next(error)
  }
}

export const updateFormCategory = async (req, res, next) => {
  try {
    const update = await FormCategory.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )

    return sendResponse(res, update)
  } catch (error) {
    next(error)
  }
}

export const getAllFormCategories = async (req, res, next) => {
  try {
    const formCategory = await FormCategory.find()
    return res.status(200).json(formCategory)
  } catch (error) {
    next(error)
  }
}

export const getFormCategoryById = async (req, res, next) => {
  try {
    const formCategory = await FormCategory.findById({
      _id: req.params.id,
    }).populate({
      path: 'forms',
      select: '_id name description userId',
    })
    return sendResponse(res, formCategory)
  } catch (error) {
    next(error)
  }
}

export const getFormCategoryByUserId = async (req, res, next) => {
  try {
    const formCategory = await FormCategory.find({ creatorId: req.params.id })
    return sendResponse(res, formCategory)
  } catch (error) {
    next(error)
  }
}

export const deleteFormCategoryById = async (req, res, next) => {
  try {
    const deletedFormCategory = await FormCategory.findByIdAndDelete({
      _id: req.params.id,
    })

    if (deletedFormCategory) {
      return sendResponse(res, { message: 'Deleted Successfully' })
    } else {
      return sendResponse(res)
    }
  } catch (error) {
    next(error)
  }
}
