import { getAllUsersApi } from '@/api/userApi'
import MainClientPage from './MainClientPage'

const page = async ({ searchParams }) => {
  const data = await getAllUsersApi(searchParams)
  return <MainClientPage data={data?.data || []} />
}

export default page
