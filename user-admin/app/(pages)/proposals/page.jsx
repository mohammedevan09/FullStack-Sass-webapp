import { getAllProposals } from '@/api/proposalApi'
import MainProposalsPage from './MainProposalsPage'

const page = async ({ searchParams }) => {
  const { proposals, totalDocsCount } = await getAllProposals({
    ...searchParams,
    userId: searchParams?.userId,
    role: 'admin',
  })

  return (
    <>
      <MainProposalsPage
        proposals={proposals}
        totalDocsCount={totalDocsCount}
      />
    </>
  )
}

export default page
