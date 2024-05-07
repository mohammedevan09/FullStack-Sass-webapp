'use client'

import ClientTable from '@/components/tables/client/ClientTable'
import { AllProjectsIcon } from '@/staticData/Icon'

const MainClientPage = ({ data }) => {
  return (
    <div className="sm:mt-16 mt-10 sm:mb-14 mb-8">
      <h2 className="text-zinc-700 text-2xl flex justify-start items-center sm:gap-3 gap-2">
        <AllProjectsIcon color={'black'} /> Users List
      </h2>
      <div className="bg-white rounded-[20px] my-14 overflow-x-hidden">
        <ClientTable data={data} />
      </div>
    </div>
  )
}

export default MainClientPage
