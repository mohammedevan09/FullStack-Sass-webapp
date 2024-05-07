'use client'

import MainTicketTables from '@/components/tables/ticket/MainTicketTables'
import { useSelector } from 'react-redux'

const MainAllTicketsPage = ({ tickets }) => {
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div>
        <div className="bg-white rounded-[20px] my-8 overflow-x-hidden pt-4">
          <MainTicketTables tickets={tickets} userInfo={userInfo} />
        </div>
      </div>
    </>
  )
}

export default MainAllTicketsPage
