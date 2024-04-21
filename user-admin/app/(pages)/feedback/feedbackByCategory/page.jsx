import { getAllFeedback, getFeedbackCategoryByIdApi } from '@/api/feedback'
import MainFeedbackByCategory from './MainFeedbackByCategory'

const page = async ({ searchParams }) => {
  const feedbackCategory = await getFeedbackCategoryByIdApi(searchParams?.id)
  const feedbacks = await getAllFeedback({
    categoryId: searchParams?.id,
  })
  return (
    <MainFeedbackByCategory
      feedbackCategory={feedbackCategory}
      feedbacks={feedbacks}
    />
  )
}

export default page
