'use client'

import { deleteTeamApi } from '@/api/teamApi'
import DeleteModal from '@/components/modals/DeleteModal'
import AddNewTeamMemberModal from '@/components/modals/settingsModals/AddNewTeamMemberModal'
import TeamMemberAddedModal from '@/components/modals/settingsModals/TeamMemberAddedModal'
import TeamTable from '@/components/tables/settings/TeamTable'
import { AllProjectsIcon } from '@/staticData/Icon'
import { redirect } from 'next/navigation'
import { useLayoutEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const MainTeam = ({ teamData }) => {
  const [openModal, setOpenModal] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)
  const [editableMember, setEditableMember] = useState(null)
  const [successModal, setSuccessModal] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  const isNotDeletable = useMemo(() => {
    if (!editableMember) return false
    return Object.values(editableMember?.access).some(
      (access) => access?.access && access?.accessOf?.length > 0
    )
  }, [editableMember])

  useLayoutEffect(() => {
    if (userInfo?.access) {
      redirect('/')
    }
  }, [userInfo])

  return (
    <>
      <h2 className="text-zinc-700 text-xl flex justify-start items-center sm:gap-3 gap-2 mt-12 mb-6 font-medium">
        <AllProjectsIcon color={'black'} /> Team of{' '}
        <span className="text-blue-600">{userInfo?.fullName}</span>
      </h2>
      <TeamTable
        members={teamData}
        setOpenModal={setOpenModal}
        setRemoveModal={setRemoveModal}
        setEditableMember={setEditableMember}
      />

      <button
        className="py-2 px-7 bg-blue-800 rounded-md text-white text-base font-normal my-10 hover:scale-105 transition"
        onClick={() => {
          setEditableMember(null)
          setOpenModal(true)
        }}
      >
        + Add Team member
      </button>
      {openModal && (
        <AddNewTeamMemberModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setSuccessModal={setSuccessModal}
          initialData={editableMember}
        />
      )}
      {removeModal && (
        <DeleteModal
          openModal={removeModal}
          setOpenModal={setRemoveModal}
          deleteDataName={editableMember?.fullName}
          api={() => deleteTeamApi(editableMember?._id)}
          isNotDeletableMessage={
            isNotDeletable &&
            'has access to some of the things! Please remove them first!'
          }
        />
      )}
      {successModal && (
        <TeamMemberAddedModal
          editableMember={editableMember}
          setSuccessModal={setSuccessModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  )
}

export default MainTeam
