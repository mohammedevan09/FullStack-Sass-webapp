import { getAllFeedbackCategoryApi } from '@/api/feedback'
import FeedbackCategory from './FeedbackCategory'

const page = async () => {
  const feedbackCategories = await getAllFeedbackCategoryApi()
  return <FeedbackCategory feedbackCategories={feedbackCategories} />
}

export default page
