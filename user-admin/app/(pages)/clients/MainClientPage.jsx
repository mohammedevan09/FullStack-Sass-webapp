'use client'

import ClientTable from '@/components/tables/client/ClientTable'
import ProjectHeading from '../orders/_components/ProjectHeading'
import TablePagination from '@/components/others/TablePagination'

const MainClientPage = ({ data, totalDocsCount }) => {
  return (
    <div className="sm:mt-16 mt-10 sm:mb-14 mb-8">
      <ProjectHeading title={'Users List'} isHideStatus={true} />
      <div className="bg-white rounded-[20px] my-6 overflow-x-hidden pb-4">
        <ClientTable data={data} />
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </div>
  )
}

export default MainClientPage
