'use client'

import { AddProjectIcon } from '@/staticData/Icon'
import Link from 'next/link'
import NormalServiceTables from '@/components/tables/normalServiceTables'
import MediumHeading from './_components/MediumHeading'
import ProjectHeading from './_components/ProjectHeading'
import { useSelector } from 'react-redux'
import SubscriptionServiceTables from '@/components/tables/SubscriptionServiceTables'
import HourlyServiceTables from '@/components/tables/HourlyServiceTables'

const MainAllProjects = ({ projects, subscriptions, hourlyData }) => {
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div className="sm:px-4 xs:px-3 px-1">
        <Link
          href={'/dashboard/services'}
          className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 sm:w-[180px] w-[150px] flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow border-2 border-blue-800 text-blue-800 lg:text-xl text-lg font-medium"
        >
          <AddProjectIcon /> Add Projects
        </Link>

        <ProjectHeading />
      </div>

      <div className="bg-white rounded-[20px] sm:mx-4 xs:mx-3 mx-1 my-8 overflow-x-hidden">
        <div>
          <MediumHeading
            title={'Normal Projects'}
            link={
              // projects?.length > 4 &&
              `/dashboard/all-projects/normalService?userId=${userInfo?._id}`
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
              `/dashboard/all-projects/subscriptionService?userId=${userInfo?._id}`
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
              `/dashboard/all-projects/hourlyService?userId=${userInfo?._id}`
            }
          />
          <HourlyServiceTables hourlyData={hourlyData} />
        </div>
      </div>
    </>
  )
}

export default MainAllProjects
