'use client'

import AddNewTeamMemberModal from '@/components/modals/AddNewTeamMemberModal'
import { useState } from 'react'

const MainTeam = ({ teamData }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className="bg-white rounded-[20.37px] px-7 py-8 my-14 w-full">
        <table className="w-[825px]">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>Member Name</th>
              <th className="text-center">Position</th>
              <th className="text-center">Access</th>
              <th className="text-center">Action</th>
            </tr>

            {teamData?.map((item, i) => (
              <tr key={i}>
                <td className="py-7">
                  <div className="text-zinc-700 text-xl font-normal flex justify-start items-center gap-3">
                    {item?.name}
                  </div>
                </td>
                <td className="py-7 text-center">
                  <div
                    className={`w-[197px] h-[34px] bg-opacity-20 rounded-[20px] mx-auto flex justify-center items-center gap-2 bg-rose-600`}
                  >
                    {item?.position}
                  </div>
                </td>
                <td className="py-7 text-center">{item?.access}</td>
                <td className="py-7 text-center">
                  <button className=" w-[100px] h-[34px] bg-red-600 rounded-[10px] text-white text-center">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="w-[150px] h-12 py-2 px-5 bg-blue-800 rounded-lg text-white text-base font-normal"
        onClick={() => setOpenModal(true)}
      >
        + Add member
      </button>
      {openModal && (
        <AddNewTeamMemberModal
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  )
}

export default MainTeam
