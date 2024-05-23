import { getAllService } from '@/api/serviceApi'
import MainServiceList from './MainServiceList'

const page = async ({ searchParams }) => {
  const { services } = await getAllService(searchParams)

  return (
    <>
      <MainServiceList services={services || {}} />
    </>
  )
}

export default page
