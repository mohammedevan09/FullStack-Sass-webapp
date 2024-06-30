'use client'

import { addParticipantChatApi, removeParticipantChatApi } from '@/api/chatApi'
import { giveTeamAccessApi, removeTeamAccessApi } from '@/api/teamApi'
import CancelOrderModal from '@/components/modals/orderModal/CancelOrderModal'
import GiveTeamAccessModal from '@/components/modals/settingsModals/GiveTeamAccessModal'
import RemoveTeamAccessModal from '@/components/modals/settingsModals/RemoveTeamAccessModal'
import { FilterByIdIcon } from '@/staticData/Icon'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const TakeAction = ({ order, orderChat, setOrderData, link }) => {
  const { userInfo } = useSelector((state) => state?.user)

  const takeActionData = !userInfo?.creatorId
    ? [
        order?.status !== 'canceled'
          ? { title: 'Cancel Service', type: 'CANCEL' }
          : { title: 'Renew Service', type: 'RENEW' },
        { title: 'Grant Access', type: 'ACCESS' },
        { title: 'Remove Access', type: 'REMOVE_ACCESS' },
      ]
    : [
        order?.status !== 'canceled'
          ? { title: 'Cancel Service', type: 'CANCEL' }
          : { title: 'Renew Service', type: 'RENEW' },
      ]

  const [dropOpen, setDropOpen] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)
  const [accessModal, setAccessModal] = useState(false)
  const [removeAccessModal, setRemoveAccessModal] = useState(false)

  const handleClick = (item) => {
    if (item?.type === 'CANCEL' || item?.type === 'RENEW') {
      e.preventDefault()
      if (userInfo?.creatorId) {
        return showTeamMemberErrorToast()
      } else {
        setCancelModal(true)
      }
    } else if (item?.type === 'ACCESS') {
      if (userInfo?.creatorId) {
        return showTeamMemberErrorToast()
      } else {
        setAccessModal(true)
      }
    } else if (item?.type === 'REMOVE_ACCESS') {
      if (userInfo?.creatorId) {
        return showTeamMemberErrorToast()
      } else {
        setRemoveAccessModal(true)
      }
    }
  }

  return (
    <>
      <div className="relative min-w-[154px]">
        <div className="bg-white grid items-center px-4 py-1 rounded-md overflow-hidden">
          <button
            className="flex items-center gap-2 text-base font-semibold"
            onClick={(e) => {
              e.preventDefault()
              setDropOpen((prev) => !prev)
            }}
          >
            Take Action <FilterByIdIcon />
          </button>
          <div
            className={`${
              dropOpen ? 'max-h-[400px]' : 'max-h-0'
            } transition-all duration-300 ease-in-out`}
          >
            {takeActionData?.map((item, i) => (
              <div
                key={i}
                className={`border-zinc-300 border-t mt-3`}
                onClick={() => handleClick(item)}
              >
                <button className="pt-2 hover:scale-105 transition font-semibold hover:text-blue-600">
                  {item?.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {cancelModal && (
        <CancelOrderModal
          order={order}
          setOrderData={setOrderData}
          openModal={cancelModal}
          setOpenModal={setCancelModal}
          link={link}
        />
      )}
      {accessModal && (
        <GiveTeamAccessModal
          openModal={accessModal}
          setOpenModal={setAccessModal}
          accessType={'orders'}
          order={order}
          api={async (val) => {
            await giveTeamAccessApi(
              {
                accessType: 'orders',
                _id: order?._id,
              },
              val?.value?._id,
              userInfo?.token
            )
            await addParticipantChatApi(
              'order',
              orderChat?._id,
              {
                participantId: val?.value?._id,
                participantType: 'Team',
              },
              userInfo?.token
            )
          }}
        />
      )}
      {removeAccessModal && (
        <RemoveTeamAccessModal
          openModal={removeAccessModal}
          setOpenModal={setRemoveAccessModal}
          accessType={'orders'}
          order={order}
          api={async (val) => {
            await removeTeamAccessApi(
              {
                accessType: 'orders',
                _id: order?._id,
              },
              val?.value?._id
            )
            await removeParticipantChatApi(
              'order',
              orderChat?._id,
              {
                participantId: val?.value?._id,
                participantType: 'Team',
              },
              userInfo?.token
            )
          }}
        />
      )}
    </>
  )
}

export default TakeAction
