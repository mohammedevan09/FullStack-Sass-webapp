'use client'

import GetACustomProposalModal from '@/components/modals/proposalsModals/GetACustomProposalModal'
import { AddProjectIcon } from '@/staticData/Icon'
import { useState } from 'react'
import ThanksSubModal from '@/components/modals/proposalsModals/ThanksSubModal'
import ProposalTables from '@/components/tables/proposal/ProposalTable'
import TablePagination from '@/components/others/TablePagination'
import ProjectHeading from '../orders/_components/ProjectHeading'

const MainProposalsPage = ({ proposals, totalDocsCount }) => {
  const [openModalCustom, setOpenModalCustom] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)

  return (
    <div className="sm:px-4 xs:px-3 px-1">
      <button
        onClick={() => setOpenModalCustom(true)}
        className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-2 sm:w-[285px] w-[240px] flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow border-2 border-blue-800 text-blue-800 lg:text-xl text-base font-medium"
      >
        <AddProjectIcon /> Request new proposals
      </button>
      <ProjectHeading title={'All Proposals'} />
      <div className="bg-white rounded-[20px] py-4 overflow-x-hidden mt-6">
        <ProposalTables projects={proposals} />
        <TablePagination pageCount={totalDocsCount} />
      </div>
      {openModalCustom && (
        <GetACustomProposalModal
          openModal={openModalCustom}
          setOpenModal={setOpenModalCustom}
          openSubModal={openSubModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
      {openSubModal && (
        <ThanksSubModal
          setOpenModal={setOpenModalCustom}
          setOpenSubModal={setOpenSubModal}
        />
      )}
    </div>
  )
}

export default MainProposalsPage
