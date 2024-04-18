import { getServiceById } from '@/api/serviceApi'
import MarketPlaceHeadings from '../../../_components/MarketPlaceHeadings'
import MainHourlyPricingPage from '../../../_components/servicePages/MainHourlyPricingPage'

const page = async ({ params }) => {
  const service = await getServiceById(`hourlyService/${params?.id}`)

  return (
    <div className="grid items-center">
      <MainHourlyPricingPage service={service} link={`hourlyService`} />
    </div>
  )
}

export default page
