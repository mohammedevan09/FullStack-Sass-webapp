import { getServiceById } from '@/api/serviceApi'
import MainServicePricingPage from '../../../_components/servicePages/MainServicePricingPage'
import MarketPlaceHeadings from '../../../_components/MarketPlaceHeadings'

const page = async ({ params }) => {
  const service = await getServiceById(`subscriptionService/${params?.id}`)

  return (
    <div className="grid items-center">
      <MarketPlaceHeadings
        heading={service?.heading}
        subheading={service?.subheading}
      />
      <MainServicePricingPage service={service} link={`subscriptionService`} />
    </div>
  )
}

export default page
