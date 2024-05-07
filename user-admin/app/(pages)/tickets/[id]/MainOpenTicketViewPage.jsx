'use client'

import BackButton from '@/components/others/BackButton'
import InboxAndMessaging from '../../orders/_components/InboxAndMessaging'
import StatusColor, { makeCapitalize } from '@/utils/StatusColor'
import Action from '@/components/others/Action'
import { deleteTicketApi, updateTicketApi } from '@/api/ticketApi'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { EditIcon } from '@/staticData/Icon'

const MainOpenTicketViewPage = ({ data, chat }) => {
  const router = useRouter()
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
        <BackButton link={'/tickets'} title={'Go Back'} />
        <div className="sm:flex grid justify-between items-start sm:mb-4 mb-2 gap-3">
          <div className="grid gap-3">
            <h1 className="text-xl font-semibold">{data?.title}</h1>
            <h2 className="font-medium text-gray-600 text-sm">
              <span className="font-semibold text-black text-base">
                Project -{' '}
              </span>
              {data?.orderId?.title} - #{data?.orderId?._id}
            </h2>

            <h2 className="text-sm font-medium">
              <span className="font-semibold text-black text-base">
                Priority -{' '}
              </span>
              {makeCapitalize(data?.priority)}
            </h2>

            <div className="lg:w-[127px] w-[96px] font-medium text-sm">
              <StatusColor status={data?.status} />
            </div>
          </div>
          <div className="flex gap-2 items-start">
            {/* <button
              onClick={() => setEditModal(true)}
              className="flex justify-center min-w-[135px] items-center gap-2 text-base py-1 px-4 rounded-md font-semibold hover:scale-105 transition text-white bg-blue-500"
            >
              Edit Status <EditIcon color={'white'} />
            </button> */}
            <Action
              to={'ticket'}
              accessType={'tickets'}
              data={data}
              chat={chat?.chat}
              deleteApi={async () => {
                await deleteTicketApi(data?._id)
                router.push(`/dashboard/tickets?userId=${userInfo?._id}`)
              }}
              statusApi={async (status) => {
                await updateTicketApi({ status }, data?._id)
              }}
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold pt-10 pb-5">
            Inbox & Messaging
          </h1>
          <InboxAndMessaging
            to={'ticket'}
            itemData={data}
            chatData={chat?.chat}
            messageCount={chat?.messageCount}
          />
        </div>
      </div>
    </>
  )
}

export default MainOpenTicketViewPage
