'use client'

import { addParticipantChatApi, removeParticipantChatApi } from '@/api/chatApi'
import { giveTeamAccessApi, removeTeamAccessApi } from '@/api/teamApi'
import GiveTeamAccessModal from '@/components/modals/settingsModals/GiveTeamAccessModal'
import RemoveTeamAccessModal from '@/components/modals/settingsModals/RemoveTeamAccessModal'
import { FilterByIdIcon } from '@/staticData/Icon'
import { useState } from 'react'
import DeleteModal from '../modals/DeleteModal'
import { useSelector } from 'react-redux'

const Action = ({ data, chat, accessType, to, deleteApi }) => {
  const { userInfo } = useSelector((state) => state?.user)

  const actionData = [
    { title: 'Delete', type: 'DELETE' },
    { title: 'Grant Access', type: 'ACCESS' },
    { title: 'Remove Access', type: 'REMOVE_ACCESS' },
  ]

  const [dropOpen, setDropOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [accessModal, setAccessModal] = useState(false)
  const [removeAccessModal, setRemoveAccessModal] = useState(false)

  const handleClick = (item) => {
    if (item?.type === 'DELETE') {
      setDeleteModal(true)
    } else if (item?.type === 'ACCESS') {
      setAccessModal(true)
    } else if (item?.type === 'REMOVE_ACCESS') {
      setRemoveAccessModal(true)
    }
  }

  return (
    <>
      <div className="relative min-w-[154px] z-[9]">
        <div className="bg-white grid items-center px-4 py-1 rounded-md overflow-hidden absolute z-10">
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
            } transition-all duration-500 ease-in-out`}
          >
            {actionData?.map((item, i) => (
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
      {deleteModal && (
        <DeleteModal
          deleteDataName={data?.title}
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
          api={deleteApi}
        />
      )}
      {accessModal && (
        <GiveTeamAccessModal
          openModal={accessModal}
          setOpenModal={setAccessModal}
          accessType={accessType}
          order={data}
          api={async (val) => {
            await giveTeamAccessApi(
              {
                accessType: accessType,
                _id: data?._id,
              },
              val?.value?._id,
              userInfo?.token
            )
            await addParticipantChatApi(
              to,
              chat?._id,
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
          accessType={accessType}
          order={data}
          api={async (val) => {
            await removeTeamAccessApi(
              {
                accessType: accessType,
                _id: data?._id,
              },
              val?.value?._id
            )
            await removeParticipantChatApi(
              to,
              chat?._id,
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

export default Action
