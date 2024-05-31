import express from 'express'
import {
  createGuide,
  deleteGuide,
  getAllGuides,
  getGuideById,
  updateGuide,
} from '../controller/guideController.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createGuide)
router.get('/', getAllGuides)
router.get('/:id', getGuideById)
router.put('/:id', authMiddleware, isAdmin, updateGuide)
router.delete('/:id', authMiddleware, isAdmin, deleteGuide)

export default router
