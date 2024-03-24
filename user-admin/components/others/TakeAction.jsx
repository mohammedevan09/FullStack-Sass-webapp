'use client'

import { FilterByIdIcon } from '@/staticData/Icon'
import { useState } from 'react'

const takeActionData = [
  { title: 'Edit details', type: 'EDIT' },
  { title: 'Delete service', type: 'DELETE' },
]

const TakeAction = ({ setEditModal, setDeleteModal }) => {
  const [dropOpen, setDropOpen] = useState(false)

  const handleClick = (item) => {
    if (item?.type === 'EDIT') {
      setEditModal(true)
    } else {
      setDeleteModal(true)
    }
  }

  return (
    <div className="relative">
      <div className="bg-white grid justify-start items-center px-4 py-1 rounded-md">
        <button
          className="flex justify-center items-center gap-1 text-base font-semibold"
          onClick={(e) => {
            e.preventDefault()
            setDropOpen((prev) => !prev)
          }}
        >
          Take Action <FilterByIdIcon />
        </button>
        {takeActionData?.map((item, i) => (
          <div
            key={i}
            className={`${
              dropOpen
                ? 'border-zinc-400 border-t mt-3 h-full overflow-visible'
                : 'h-0 overflow-hidden'
            }`}
            onClick={() => handleClick(item)}
          >
            <button className="pt-2 hover:font-bold">{item?.title}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TakeAction
