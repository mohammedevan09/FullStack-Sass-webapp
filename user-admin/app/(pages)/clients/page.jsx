import { getAllUsersApi } from '@/api/userApi'
import MainClientPage from './MainClientPage'

const page = async ({ searchParams }) => {
  const { data, totalDocsCount } = await getAllUsersApi(searchParams)

  return <MainClientPage data={data || []} totalDocsCount={totalDocsCount} />
}

export default page
