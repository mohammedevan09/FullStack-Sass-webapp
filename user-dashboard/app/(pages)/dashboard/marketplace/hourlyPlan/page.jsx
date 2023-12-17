import MainHourlyPlan from './MainHourlyPlan'
import MarketPlaceHeadings from '../MarketPlaceHeadings'

const page = () => {
  return (
    <div className="grid items-center justify-center">
      <MarketPlaceHeadings />
      <MainHourlyPlan />
    </div>
  )
}

export default page
