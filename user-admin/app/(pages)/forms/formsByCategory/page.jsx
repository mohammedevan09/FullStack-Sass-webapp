import { getAllForm, getFormCategoryById } from '@/api/formApi'
import MainFormsByCategory from './MainFormsByCategory'

const page = async ({ searchParams }) => {
  const formCategory = await getFormCategoryById(searchParams?.id)
  const forms = await getAllForm({
    categoryId: searchParams?.id,
  })

  return (
    <>
      <MainFormsByCategory
        formCategory={formCategory}
        forms={forms}
        searchParams={searchParams}
      />
    </>
  )
}

export default page
