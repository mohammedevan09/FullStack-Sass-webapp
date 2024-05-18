import { getAllForm, getFormCategoryById } from '@/api/formApi'
import MainFormsByCategory from './MainFormsByCategory'
import TablePagination from '@/components/others/TablePagination'

const page = async ({ searchParams }) => {
  const formCategory = await getFormCategoryById(searchParams?.id)
  const { forms, totalDocsCount } = await getAllForm({
    ...searchParams,
    categoryId: searchParams?.id,
  })

  return (
    <>
      <MainFormsByCategory
        formCategory={formCategory}
        forms={forms || []}
        searchParams={searchParams}
      />
      <div className="mt-6 w-full flex justify-center">
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </>
  )
}

export default page
