'use client'

import ProposalTables from '@/components/tables/proposal/ProposalTable'
import ProjectHeading from '../orders/_components/ProjectHeading'
import TablePagination from '@/components/others/TablePagination'

const MainProposalsPage = ({ proposals, totalDocsCount }) => {
  return (
    <div className="sm:mt-16 mt-10">
      <ProjectHeading title={'All Proposals'} />
      <div className="bg-white rounded-[20px] py-4 overflow-x-hidden mt-6">
        <ProposalTables projects={proposals} />
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </div>
  )
}

export default MainProposalsPage
