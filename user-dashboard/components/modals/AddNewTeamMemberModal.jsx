import Input from '../Input'
import Labels from '../Labels'

const AddNewTeamMemberModal = ({ setSuccessModal, setOpenModal }) => {
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

  return (
    <div className="fixed z-[100] left-0 top-0 right-0 bottom-0 modal-b-blur h-screen w-screen overflow-y-scroll">
      <div className="flex justify-center items-center sm:my-20 my-16">
        <div className="grid bg-white sm:pt-16 pt-8 pb-4 sm:px-24 xs:px-6 px-2 rounded-[20px] overflow-x-hidden gap-7">
          <h2 className="text-xl font-semibold mx-auto">
            Add new team members
          </h2>
          <Input
            placeholder={'Full Name'}
            type={'text'}
            cn={'sm:w-[472.44px] w-[340px]'}
          />
          <Input
            placeholder={'Email Address'}
            type={'email'}
            cn={'sm:w-[472.44px] w-[340px]'}
          />
          <Input
            placeholder={'Position/Designation/Job title'}
            type={'text'}
            cn={'sm:w-[472.44px] w-[340px]'}
          />
          <div>
            <h3 className="text-base font-medium leading-relaxed mb-4 text-center">
              Select Access to profile and what they can see, manage.
            </h3>
            <div className="grid sm:grid-cols-3 grid-cols-2 items-center border-t border-gray-400 sm:py-9 py-5 pl-8 sm:gap-6 gap-2">
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
                setOpenModal(false)
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
      </div>
    </div>
  )
}

export default AddNewTeamMemberModal
