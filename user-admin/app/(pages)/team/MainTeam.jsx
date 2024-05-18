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
import ProjectHeading from '../orders/_components/ProjectHeading'
import TablePagination from '@/components/others/TablePagination'

const MainTeam = ({ teamData, totalDocsCount }) => {
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
      <div className="my-4">
        <ProjectHeading
          title={
            <div
              dangerouslySetInnerHTML={{
                __html: `Team of <span class="text-blue-600">${userInfo?.fullName}</span>`,
              }}
            />
          }
          isHideStatus={true}
        />
      </div>
      <TeamTable
        members={teamData}
        setOpenModal={setOpenModal}
        setRemoveModal={setRemoveModal}
        setEditableMember={setEditableMember}
      />
      <div className="my-3">
        <TablePagination pageCount={totalDocsCount} />
      </div>

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
