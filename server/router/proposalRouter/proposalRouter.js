import express from 'express'
import { teamMiddleware } from '../../middleware/teamMiddleware.js'
import {
  createProposal,
  deleteProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
} from '../../controller/proposalsController/proposalController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, createProposal)
router.get('/', teamMiddleware, getAllProposals)
router.get('/:id', getProposalById)
router.put('/:id', authMiddleware, updateProposal)
router.delete('/:id', authMiddleware, deleteProposal)

export default router
