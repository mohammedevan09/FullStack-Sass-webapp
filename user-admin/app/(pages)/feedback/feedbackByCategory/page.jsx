import { getAllFeedback, getFeedbackCategoryByIdApi } from '@/api/feedback'
import MainFeedbackByCategory from './MainFeedbackByCategory'
import TablePagination from '@/components/others/TablePagination'

const page = async ({ searchParams }) => {
  const feedbackCategory = await getFeedbackCategoryByIdApi(searchParams?.id)
  const { feedback, totalDocsCount } = await getAllFeedback({
    categoryId: searchParams?.id,
  })
  return (
    <>
      <MainFeedbackByCategory
        feedbackCategory={feedbackCategory}
        feedbacks={feedback || []}
      />
      <div className="mt-6 w-full flex justify-center">
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </>
  )
}

export default page
