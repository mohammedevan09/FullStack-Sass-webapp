import express from 'express'
import {
  createGuide,
  deleteGuide,
  getAllGuides,
  getGuideById,
  updateGuide,
} from '../controller/guideController.js'

const router = express.Router()

router.post('/', createGuide)
router.get('/', getAllGuides)
router.get('/:id', getGuideById)
router.put('/:id', updateGuide)
router.delete('/:id', deleteGuide)

export default router
