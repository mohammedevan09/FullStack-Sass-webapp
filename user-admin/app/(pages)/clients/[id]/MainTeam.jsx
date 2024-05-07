'use client'

import { blockUserApi } from '@/api/userApi'
import DeleteModal from '@/components/modals/DeleteModal'
import AddNewTeamMemberModal from '@/components/modals/settingsModals/AddNewTeamMemberModal'
import TeamTable from '@/components/tables/settings/TeamTable'
import dummyProfile from '@/public/images/dummyProfile.png'
import TrueFalseColumn, { IsBlockedColumn } from '@/utils/TrueFalseColumn'
import { formatDateTwo } from '@/utils/formateDateAndTime'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const MainTeam = ({ teamData, user }) => {
  const [openModal, setOpenModal] = useState(false)
  const [editableMember, setEditableMember] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  const userFields = [
    { title: 'User ID', value: `#${user?._id}` },
    { title: 'Referred By', value: `#${user?.referredBy}` || 'None' },
    { title: 'Phone Number', value: user?.number },
    { title: 'Full Name', value: user?.fullName },
    { title: 'Email', value: user?.email },
    { title: 'Company Name', value: user?.company_name },
    { title: 'Company Website', value: user?.company_website },
    { title: 'Position', value: user?.position },
    {
      title: 'Email Verified',
      value: (
        <div className="w-[70px] text-center">
          <TrueFalseColumn className={'text-xs'} value={user?.email_verified} />
        </div>
      ),
    },
    {
      title: 'Blocked',
      value: (
        <div className={`w-[70px] text-center`}>
          <IsBlockedColumn className={'text-xs'} value={user?.isBlocked} />
        </div>
      ),
    },
    { title: 'Created At', value: formatDateTwo(user?.createdAt) },
    { title: 'Profile Updated', value: formatDateTwo(user?.updatedAt) },
  ]

  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div className="w-[100px]">
          <Image
            src={user?.profileImage || dummyProfile}
            alt="profileImage"
            width={200}
            height={200}
            className="h-[100px] rounded-full object-cover bg-[#7136ff36]"
          />
        </div>
        <button
          className={`py-2 px-4 rounded-lg bg-rose-500 text-white font-semibold`}
          onClick={() => setDeleteModal(true)}
        >
          {user?.isBlocked ? 'Unblock' : 'Block'} User
        </button>
      </div>
      <div className="grid md:grid-cols-2 font-semibold gap-4 lg:text-sm text-xs overflow-hidden relative pricing-shadow bg-white py-7 lg:px-5 px-7 rounded-xl">
        {userFields?.map((field, i) => (
          <div key={i} className="flex items-center justify-start gap-2">
            <h5
              className="font-bold sm:w-full xs:w-1/2 
            "
            >
              {field.title} -
            </h5>
            <div className="sm:w-full w-1/2">{field.value}</div>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-semibold pt-10 pb-5">
        <span className="text-blue-600">{user?.fullName}</span> Team Members
      </h1>
      <TeamTable
        members={teamData}
        setOpenModal={setOpenModal}
        setEditableMember={setEditableMember}
        isOnlyViewable={true}
      />

      {openModal && (
        <AddNewTeamMemberModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          initialData={editableMember}
          isOnlyViewable={true}
        />
      )}
      {deleteModal && (
        <DeleteModal
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
          deleteDataName={user?.fullName}
          api={async () => {
            await blockUserApi(
              user?._id,
              {
                isBlocked: !user?.isBlocked,
              },
              userInfo?.token
            )
          }}
          buttonType={user?.isBlocked ? 'Unblock' : 'Block'}
        />
      )}
    </>
  )
}

export default MainTeam
