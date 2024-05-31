'use client'

import { FilterByIdIcon } from '@/staticData/Icon'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const takeActionData = [
  { title: 'Edit details', type: 'EDIT' },
  { title: 'Delete service', type: 'DELETE' },
]

const TakeAction = ({ setEditModal, setDeleteModal }) => {
  const [dropOpen, setDropOpen] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  const handleClick = (item) => {
    if (userInfo?.creatorId) {
      return showTeamMemberErrorToast()
    }
    if (item?.type === 'EDIT') {
      setEditModal(true)
    } else {
      setDeleteModal(true)
    }
  }

  return (
    <div className="relative">
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
  )
}

export default TakeAction
