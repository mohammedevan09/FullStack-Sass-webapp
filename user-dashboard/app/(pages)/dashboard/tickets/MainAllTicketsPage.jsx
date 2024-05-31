'use client'

import OpenTicketModal from '@/components/modals/ticketModals/OpenTicketModal'
import TicketSubmitThanksModal from '@/components/modals/ticketModals/TicketSubmitThanksModal'
import MainTicketTables from '@/components/tables/ticket/MainTicketTables'
import { AddProjectIcon } from '@/staticData/Icon'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectHeading from '../orders/_components/ProjectHeading'
import TablePagination from '@/components/others/TablePagination'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'

const MainAllTicketsPage = ({ orders, tickets, totalDocsCount }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div>
        <button
          className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 sm:w-[190px] w-[150px] flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow border-2 border-blue-800 text-blue-800 lg:text-xl text-lg font-medium"
          onClick={(e) => {
            e.preventDefault()
            if (userInfo?.creatorId) {
              return showTeamMemberErrorToast()
            } else {
              setOpenModal(true)
            }
          }}
        >
          <AddProjectIcon /> Add Tickets
        </button>
        <ProjectHeading title={'All Tickets'} />
        <div className="bg-white rounded-[20px] my-8 overflow-x-hidden pt-8 pb-4">
          <MainTicketTables tickets={tickets} userInfo={userInfo} />
          <TablePagination pageCount={totalDocsCount} />
        </div>
      </div>

      {openModal && (
        <OpenTicketModal
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
          openModal={openModal}
          orders={orders}
        />
      )}
      {openSubModal && (
        <TicketSubmitThanksModal
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
    </>
  )
}

export default MainAllTicketsPage
