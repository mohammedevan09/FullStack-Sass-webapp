import { getFormCategoryById } from '@/api/formApi'
import MainFormsByCategory from './MainFormsByCategory'

const page = async ({ searchParams }) => {
  const forms = await getFormCategoryById(searchParams?.id)
  return <MainFormsByCategory forms={forms} />
}

export default page
