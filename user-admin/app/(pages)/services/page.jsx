import { getAllService } from '@/api/serviceApi'
import MainServiceList from './MainServiceList'

const page = async () => {
  const services = await getAllService({ limit: 5, page: 1 })

  return (
    <>
      <MainServiceList services={services} />
    </>
  )
}

export default page
