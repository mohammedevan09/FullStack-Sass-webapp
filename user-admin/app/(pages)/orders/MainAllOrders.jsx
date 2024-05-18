'use client'

import MediumHeading from './_components/MediumHeading'
import NormalServiceTables from '@/components/tables/order/NormalServiceTables'
import SubscriptionServiceTables from '@/components/tables/order/SubscriptionServiceTables'
import HourlyServiceTables from '@/components/tables/order/HourlyServiceTables'
import ProjectHeading from './_components/ProjectHeading'
import { useSelector } from 'react-redux'

const MainAllOrders = ({ projects, subscriptions, hourlyData }) => {
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div className="mt-14 mb-10">
        <ProjectHeading />
      </div>

      <div className="bg-white rounded-[20px] my-8 overflow-x-hidden">
        <div>
          <MediumHeading
            title={'Normal Projects'}
            link={
              // projects?.length > 4 &&
              `/orders/normalService?userId=${userInfo?._id}`
            }
          />
          <NormalServiceTables projects={projects} />
        </div>
        <hr />

        <div>
          <MediumHeading
            title={'Subscriptions'}
            link={
              // subscriptions?.length > 4 &&
              `/orders/subscriptionService?userId=${userInfo?._id}`
            }
          />
          <SubscriptionServiceTables subscriptions={subscriptions} />
        </div>
        <hr />
        <div>
          <MediumHeading
            title={'Hourly Plans'}
            link={
              // hourlyData?.length > 4 &&
              `/orders/hourlyService?userId=${userInfo?._id}`
            }
          />
          <HourlyServiceTables hourlyData={hourlyData} />
        </div>
      </div>
    </>
  )
}

export default MainAllOrders
