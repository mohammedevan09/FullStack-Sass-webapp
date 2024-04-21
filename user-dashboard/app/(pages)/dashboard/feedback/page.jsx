import { getAllFeedbackCategoryApi } from '@/api/feedback'
import MainFeedbackPage from './MainFeedbackPage'

const page = async () => {
  const feedbackCategories = await getAllFeedbackCategoryApi()
  return (
    <div className="sm:px-4 xs:px-3 px-1">
      <MainFeedbackPage options={feedbackCategories} />
    </div>
  )
}

export default page
