import { getFormById } from '@/api/formApi'
import MainFormPage from './MainFormPage'

const page = async ({ params, searchParams }) => {
  const form = params?.id !== 'new' && (await getFormById(params?.id))
  return (
    <MainFormPage
      form={params?.id !== 'new' ? form : {}}
      searchParams={searchParams}
    />
  )
}

export default page
