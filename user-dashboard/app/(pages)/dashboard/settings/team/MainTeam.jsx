'use client'

import AddNewTeamMemberModal from '@/components/modals/settingsModals/AddNewTeamMemberModal'
import TeamMemberAddedModal from '@/components/modals/settingsModals/TeamMemberAddedModal'
import TeamTable from '@/components/tables/settings/TeamTable'
import { useState } from 'react'

const MainTeam = ({ teamData }) => {
  const [openModal, setOpenModal] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

  return (
    <>
      <TeamTable
        members={teamData}
        setOpenModal={setOpenModal}
        setRemoveModal={setRemoveModal}
      />

      <button
        className="py-2 px-7 bg-blue-800 rounded-md text-white text-base font-normal my-10 hover:scale-105 transition"
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
    </>
  )
}

export default MainTeam
