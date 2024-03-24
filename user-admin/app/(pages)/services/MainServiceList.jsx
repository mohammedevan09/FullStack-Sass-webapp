'use client'

import AddNewService from '@/components/modals/serviceModal/AddNewService'
import ServiceTables from '@/components/tables/ServiceTables'
import { AddProjectIcon, AllProjectsIcon } from '@/staticData/Icon'
import { useState } from 'react'

const MainServiceList = ({ services }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <button
        className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 px-3 flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow  text-lg font-medium bg-blue-800 text-white"
        onClick={() => setOpenModal(true)}
      >
        <AddProjectIcon color={'white'} /> Add New Services
      </button>
      <h2 className="text-zinc-700 text-2xl flex justify-start items-center sm:gap-3 gap-2 mt-12">
        <AllProjectsIcon color={'black'} /> Services List
      </h2>

      <div className="bg-white rounded-[20px] sm:my-8 my-6">
        <ServiceTables
          serviceData={services?.Normal}
          title={'Normal Services'}
          link={'/normalService'}
        />
        <ServiceTables
          serviceData={services?.Subscription}
          title={'Subscription Services'}
          link={'/subscriptionService'}
        />
        <ServiceTables
          serviceData={services?.Hourly}
          title={'Hourly Services'}
          link={'/hourlyService'}
        />
      </div>

      {openModal && (
        <AddNewService openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  )
}

export default MainServiceList
