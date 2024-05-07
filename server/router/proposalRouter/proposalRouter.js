import express from 'express'
import { teamMiddleware } from '../../middleware/teamMiddleware.js'
import {
  createProposal,
  deleteProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
} from '../../controller/proposalsController/proposalController.js'

const router = express.Router()

router.post('/', createProposal)
router.get('/', teamMiddleware, getAllProposals)
router.get('/:id', getProposalById)
router.put('/:id', updateProposal)
router.delete('/:id', deleteProposal)

export default router
