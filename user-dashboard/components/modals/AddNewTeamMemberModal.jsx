import { useState } from 'react'
import Input from '../Input'
import Labels from '../Labels'
import TeamMemberAddedModal from './TeamMemberAddedModal'

const AddNewTeamMemberModal = ({ openModal, setOpenModal }) => {
  const checkboxItem = [
    {
      title: 'Projects',
      id: 'projects',
    },
    {
      title: 'Invoice',
      id: 'invoice',
    },
    {
      title: 'Proposals',
      id: 'proposals',
    },
    {
      title: 'Billings & payments',
      id: 'b&p',
    },
    {
      title: 'Meetings',
      id: 'meetings',
    },
    {
      title: 'Tickets',
      id: 'tickets',
    },
  ]
  const [successModal, setSuccessModal] = useState(false)
  console.log(successModal)
  return (
    <div className="flex justify-center items-center fixed z-40 w-screen h-screen left-0 top-0 right-0 bottom-0 modal-b-blur">
      <div className="grid gap-7 p-6 bg-white rounded-[20px] shadow ">
        <h2 className="text-xl font-semibold mx-auto">Add new team members</h2>
        <Input placeholder={'Full Name'} type={'text'} cn={'w-[472.44px]'} />
        <Input
          placeholder={'Email Address'}
          type={'email'}
          cn={'w-[472.44px]'}
        />
        <Input
          placeholder={'Position/Designation/Job title'}
          type={'text'}
          cn={'w-[472.44px]'}
        />
        <div>
          <h3 className="text-base font-medium leading-relaxed mb-4 text-center">
            Select Access to profile and what they can see, manage.
          </h3>
          <div className="grid grid-cols-3 items-center border-t border-gray-400 py-9 pl-8 gap-6">
            {checkboxItem?.map((item, i) => (
              <div className="flex gap-2 items-center" key={i}>
                <Input type={'checkbox'} cn={'w-4 h-4'} id={item?.id} />
                <Labels
                  name={item?.title}
                  htmlFor={item?.id}
                  cn={'text-slate-600 text-xs'}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full grid gap-2">
          <button
            className="w-full text-center text-white text-base font-semibold bg-blue-800 py-4 rounded-lg leading-7"
            onClick={(e) => {
              e.preventDefault()
              setSuccessModal(true)
            }}
          >
            Add Member
          </button>
          <button
            className="w-full text-center bg-none text-base font-semibold text-blue-800 py-4 rounded-lg leading-7"
            onClick={(e) => {
              e.preventDefault()
              setOpenModal(false)
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      {successModal && (
        <TeamMemberAddedModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  )
}

export default AddNewTeamMemberModal
