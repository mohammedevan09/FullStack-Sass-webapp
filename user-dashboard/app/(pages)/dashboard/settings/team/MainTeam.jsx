'use client'

import AddNewTeamMemberModal from '@/components/modals/settingsModals/AddNewTeamMemberModal'
import TeamMemberAddedModal from '@/components/modals/settingsModals/TeamMemberAddedModal'
import { useState } from 'react'

const MainTeam = ({ teamData }) => {
  const [openModal, setOpenModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

  return (
    <>
      <div className="bg-white rounded-[20.37px] px-7 py-8 my-14 lg:w-[825px] sm:w-[750px] w-screen overflow-x-scroll">
        <table className="w-full">
          <tbody>
            <tr className="text-zinc-700 sm:text-xl text-lg font-semibold tracking-tight text-left">
              <th>Member Name</th>
              <th className="text-center">Position</th>
              <th className="text-center">Access</th>
              <th className="text-center">Action</th>
            </tr>

            {teamData?.map((item, i) => (
              <tr key={i} className="sm:text-base text-sm">
                <td className="lg:py-7 py-3">
                  <div className="text-zinc-700 sm:text-xl text-lg font-normal flex justify-start items-center gap-3 sm:w-[250px] w-[200px]">
                    {item?.name}
                  </div>
                </td>
                <td className="lg:py-7 py-3 text-center">
                  <div
                    className={`sm:w-[197px] w-[150px] h-[34px] bg-opacity-20 rounded-[20px] mx-auto flex justify-center items-center gap-2 bg-rose-600`}
                  >
                    {item?.position}
                  </div>
                </td>
                <td className="lg:py-7 py-3 text-center">
                  <div className="sm:w-[170px] w-[150px]">{item?.access}</div>
                </td>
                <td className="lg:py-7 py-3 text-center">
                  <button className="sm:w-[100px] w-[70px] sm:h-[34px] h-8 bg-red-600 rounded-[10px] text-white text-center">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sm:px-4 xs:px-3 px-1">
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
            setSuccessModal={setSuccessModal}
          />
        )}
        {successModal && (
          <TeamMemberAddedModal
            successModal={successModal}
            setSuccessModal={setSuccessModal}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </>
  )
}

export default MainTeam
