'use client'

import MainTicketTables from '@/components/tables/ticket/MainTicketTables'
import { useSelector } from 'react-redux'
import ProjectHeading from '../orders/_components/ProjectHeading'
import TablePagination from '@/components/others/TablePagination'

const MainAllTicketsPage = ({ tickets, totalDocsCount }) => {
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div className="mt-14">
        <ProjectHeading title={'All Tickets'} />
        <div className="bg-white rounded-[20px] my-8 overflow-x-hidden pt-8 pb-4">
          <MainTicketTables tickets={tickets} userInfo={userInfo} />
          <TablePagination pageCount={totalDocsCount} />
        </div>
      </div>
    </>
  )
}

export default MainAllTicketsPage
