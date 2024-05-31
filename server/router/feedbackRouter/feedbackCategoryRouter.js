import express from 'express'
import {
  createFeedbackCategory,
  deleteFeedbackCategory,
  getAllFeedbackCategories,
  getFeedbackCategoryById,
  updateFeedbackCategory,
} from '../../controller/feedbackController/feedbackCategoryController.js'
import { authMiddleware, isAdmin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createFeedbackCategory)
router.get('/', getAllFeedbackCategories)
router.get('/:id', getFeedbackCategoryById)
router.put('/:id', authMiddleware, isAdmin, updateFeedbackCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteFeedbackCategory)

export default router
