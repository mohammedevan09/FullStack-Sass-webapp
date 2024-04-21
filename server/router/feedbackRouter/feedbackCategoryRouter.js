import express from 'express'
import {
  createFeedbackCategory,
  deleteFeedbackCategory,
  getAllFeedbackCategories,
  getFeedbackCategoryById,
  updateFeedbackCategory,
} from '../../controller/feedbackController/feedbackCategoryController.js'

const router = express.Router()

router.post('/', createFeedbackCategory)
router.get('/', getAllFeedbackCategories)
router.get('/:id', getFeedbackCategoryById)
router.put('/:id', updateFeedbackCategory)
router.delete('/:id', deleteFeedbackCategory)

export default router
