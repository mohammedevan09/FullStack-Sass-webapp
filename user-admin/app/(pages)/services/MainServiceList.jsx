'use client'

import AddNewService from '@/components/modals/serviceModal/AddNewService'
import ServiceTables from '@/components/tables/ServiceTables'
import { AddProjectIcon, AllProjectsIcon } from '@/staticData/Icon'
import { useState } from 'react'
import ServiceMediumHeading from './_components/ServiceMediumHeading'
import { useSelector } from 'react-redux'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'

const MainServiceList = ({ services }) => {
  const [openModal, setOpenModal] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <button
        className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 px-3 flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow  text-lg font-medium bg-blue-800 text-white"
        onClick={() => {
          if (userInfo?.creatorId) {
            showTeamMemberErrorToast()
          } else {
            setOpenModal(true)
          }
        }}
      >
        <AddProjectIcon color={'white'} /> Add New Services
      </button>
      <h2 className="text-zinc-700 text-2xl flex justify-start items-center sm:gap-3 gap-2 mt-12">
        <AllProjectsIcon color={'black'} /> Services List
      </h2>

      <div className="bg-white rounded-[20px] sm:my-8 my-6 pt-8 grid gap-4 overflow-x-hidden">
        <div>
          <ServiceMediumHeading
            title={'Normal Services'}
            link={
              services?.NormalService && services?.NormalService?.length > 4
                ? '/services/normalService'
                : null
            }
          />
          <ServiceTables
            serviceData={services?.NormalService || []}
            link={'/normalService'}
          />
        </div>
        <div>
          <ServiceMediumHeading
            title={'Subscription Services'}
            link={
              services?.SubscriptionService &&
              services?.SubscriptionService?.length > 4
                ? '/services/subscriptionService'
                : null
            }
          />
          <ServiceTables
            serviceData={services?.SubscriptionService || []}
            title={'Subscription Services'}
            link={'/subscriptionService'}
          />
        </div>
        <div>
          <ServiceMediumHeading
            title={'Hourly Services'}
            link={
              services?.HourlyService && services?.HourlyService?.length > 4
                ? '/services/hourlyService'
                : null
            }
          />
          <ServiceTables
            serviceData={services?.HourlyService || []}
            title={'Hourly Services'}
            link={'/hourlyService'}
          />
        </div>
      </div>

      {openModal && (
        <AddNewService openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  )
}

export default MainServiceList
