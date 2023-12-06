import { hourlyData } from '@/staticData/MainData'
import MainHourlyPlan from './MainHourlyPlan'

const page = () => {
  return (
    <>
      <MainHourlyPlan projects={hourlyData} />
    </>
  )
}

export default page
