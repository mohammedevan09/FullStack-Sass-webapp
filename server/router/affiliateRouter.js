import express from 'express'
import {
  createAffiliate,
  deleteAffiliate,
  getAllAffiliates,
  getAffiliateByUserId,
  updateAffiliate,
  addAffiliateVisitors,
} from '../controller/affiliateController.js'

const router = express.Router()

router.post('/', createAffiliate)
router.get('/', getAllAffiliates)
router.get('/:userId', getAffiliateByUserId)
router.put('/addVisitor', addAffiliateVisitors)
router.put('/:id', updateAffiliate)
router.delete('/:id', deleteAffiliate)

export default router
