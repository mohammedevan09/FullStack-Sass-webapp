import { getServiceById } from '@/api/serviceApi'
import { getAllForm } from '@/api/formApi'
import MainHourlyServicePage from '../../_components/servicePage/MainHourlyServicePage'

const page = async ({ params }) => {
  const service = await getServiceById(`hourlyService/${params?.id}`)
  const forms = await getAllForm()

  return (
    <>
      <MainHourlyServicePage service={service} forms={forms} />
    </>
  )
}

export default page
