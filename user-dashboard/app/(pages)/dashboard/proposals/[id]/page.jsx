import { getProposalByIdApi } from '@/api/proposalApi'
import MainViewProposalsPage from './MainViewProposalsPage'
import MainOneProposal from './MainOneProposal'
import { getChatByIdApi } from '@/api/chatApi'

const page = async ({ params }) => {
  const data = await getProposalByIdApi(params?.id)
  const proposalChat = await getChatByIdApi(
    'proposal',
    { limit: 100 },
    data?._id
  )
  return (
    <div className="grid w-full sm:px-4 xs:px-3 px-1">
      {data && data?.details?.isAccepted === true ? (
        <MainOneProposal data={data} chat={proposalChat} />
      ) : (
        <MainViewProposalsPage data={data} />
      )}
    </div>
  )
}

export default page
