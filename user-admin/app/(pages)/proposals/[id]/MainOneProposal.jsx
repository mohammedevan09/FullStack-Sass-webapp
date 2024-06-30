'use client'

import { deleteProposalApi, updateProposalApi } from '@/api/proposalApi'
import InboxAndMessaging from '../../orders/_components/InboxAndMessaging'
import ProjectTrackingBoard from '../../orders/_components/ProjectTrackingBoard'
import MoreInfo from '../_components/MoreInfo'
import Action from '@/components/others/Action'
import { makeCapitalize } from '@/utils/StatusColor'
import BackButton from '@/components/others/BackButton'
import { SpentHoursIcon } from '@/staticData/Icon'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { getColorClass } from '../../orders/_components/OrderBasicInfo'

const MainOneProposal = ({ data, chat }) => {
  const router = useRouter()

  const { userInfo } = useSelector((state) => state?.user)

  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <BackButton link={'/proposals'} title={'Go Back'} />
      <div className="sm:flex grid md:justify-between items-start mb-10 gap-3 font-medium">
        <div className="grid gap-3 svg-shadow bg-white md:w-[500px] w-full rounded-2xl p-5 relative overflow-hidden font-medium">
          <h1 className="text-xl font-semibold max-w-[310px]">{data?.title}</h1>
          <div className="grid gap-3 text-sm">
            <h6>
              <b>Proposal ID</b> - #{data?._id}
            </h6>
            <div className="flex items-center gap-2">
              <h6>
                <b>Total Amount</b> - ${data?.totalAmount}
              </h6>
              |
              <h6 className="flex gap-1 items-center">
                <b>Timeline</b>- {data?.timeline} Days{' '}
                <SpentHoursIcon size={'1.4rem'} />
              </h6>
            </div>
          </div>
          <div
            className={`w-[160px] h-[34px] mx-auto bg-opacity-20 absolute rotate-45 top-5 -right-10 flex justify-center items-center 
          ${getColorClass(data?.status)}
          `}
          >
            {makeCapitalize(data?.status)}
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <Action
            to={'proposal'}
            accessType={'proposals'}
            data={data}
            chat={chat?.chat}
            deleteApi={async () => {
              await deleteProposalApi(data?._id, userInfo?.token)
              router.push(`/proposals?userId=${userInfo?._id}`)
            }}
            statusApi={async (status) => {
              await updateProposalApi(status, data?._id, userInfo?.token)
            }}
          />
        </div>
      </div>

      <MoreInfo data={data} />
      <h1 className="text-2xl font-semibold pb-5 pt-10">
        Project Traction Board
      </h1>
      <ProjectTrackingBoard
        order={data}
        link={data?._id}
        api={updateProposalApi}
      />
      <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
      <InboxAndMessaging
        to={'proposal'}
        itemData={data}
        chatData={chat?.chat}
        messageCount={chat?.messageCount}
      />
    </div>
  )
}

export default MainOneProposal
