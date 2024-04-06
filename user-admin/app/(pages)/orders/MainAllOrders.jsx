'use client'

import MediumHeading from './_components/MediumHeading'
import NormalServiceTables from '@/components/tables/order/NormalServiceTables'
import SubscriptionServiceTables from '@/components/tables/order/SubscriptionServiceTables'
import HourlyServiceTables from '@/components/tables/order/HourlyServiceTables'
import ProjectHeading from './_components/ProjectHeading'

const MainAllOrders = ({ projects, subscriptions, hourlyData }) => {
  return (
    <>
      <div className="my-14">
        <ProjectHeading />
      </div>

      <div className="bg-white rounded-[20px] my-8 overflow-x-hidden">
        <div>
          <MediumHeading
            title={'Normal Projects'}
            link={
              // projects?.length > 4 &&
              `/orders/normalService`
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
              `/orders/subscriptionService`
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
              `/orders/hourlyService`
            }
          />
          <HourlyServiceTables hourlyData={hourlyData} />
        </div>
      </div>
    </>
  )
}

export default MainAllOrders
