'use client'

import Input from '@/components/Input'
import { LabelsTwo } from '@/components/Labels'
import { FilterByIdIcon, SearchByIdIcon } from '@/staticData/Icon'

const OpenTicketModal = ({ setOpenModal, setOpenSubModal }) => {
  const projectData = [
    {
      orderId: '130987',
      name: 'Wordpress development for Dcode.com',
    },
    {
      orderId: '130987',
      name: 'Wordpress development for Dcode.com',
    },
    {
      orderId: '130987',
      name: 'Wordpress development for Dcode.com',
    },
  ]
  const priority = [
    {
      title: 'High',
      color: '#FFA73F',
    },
    {
      title: 'Medium',
      color: '#7572FF',
    },
    {
      title: 'Low',
      color: '#2A2A2B',
    },
    {
      title: 'Urgent',
      color: '#F4143D',
    },
  ]

  return (
    <div className="fixed z-40 left-0 top-0 right-0 bottom-0 modal-b-blur h-screen w-screen overflow-y-scroll">
      <div className="flex justify-center items-center my-20">
        <div className="grid bg-white py-16 px-40 rounded-[20px]">
          <div className="grid gap-5 mb-20">
            <h2 className="text-2xl font-semibold mx-auto">
              Provide Ticket details & questionnaire
            </h2>
            <div className="border border-neutral-400"></div>
          </div>
          <div className="grid gap-5">
            <div className="grid">
              <LabelsTwo htmlFor={'project-title'} name={'Ticket Title'} />
              <Input
                left={true}
                id={'project-title'}
                placeholder={'Ex: Andrea’s personal web development'}
                type={'text'}
                cn={'w-[570px] text-sm'}
                cnb={'rounded-[5px]'}
                cnh={'h-[58px]'}
              />
            </div>
            <div className="grid">
              <LabelsTwo
                htmlFor={'Describe-the-projects'}
                name={'Describe the Business/projects.'}
              />
              <textarea
                id={'Describe-the-projects'}
                placeholder={'Example: its an salon business in new York etc.'}
                className="outline-none h-[191px] rounded-[5px] w-[570px] text-sm border border-zinc-400 p-5"
                type={'text'}
              />
            </div>
          </div>
          <div className="grid bg-gray-400 bg-opacity-25 rounded-[5px] my-8 p-4">
            <h3 className="mx-auto text-lg font-semibold flex items-center gap-2 mb-12">
              Select a project for this tickets <FilterByIdIcon />
            </h3>
            <div className="flex px-4 py-[7px] rounded-[5px] gap-1 bg-white w-[250px] mb-5">
              <div>
                <SearchByIdIcon />
              </div>
              <input
                type="text"
                className="outline-none bg-[none]"
                placeholder="Search by name, ID"
              />
            </div>
            {projectData?.map((item, i) => (
              <div
                key={i}
                className="text-base font-medium border-b py-4 border-stone-300"
              >
                <h4>
                  #{item?.orderId} {item?.name}
                </h4>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <h5 className="text-base font-semibold">Set priority</h5>
            {priority?.map((item, i) => (
              <div key={i} className="flex gap-2 items-start text-sm">
                <div
                  className={`border-2 rounded-full border-[${item?.color}] flex`}
                >
                  <input
                    left={true}
                    type="radio"
                    id={item?.title}
                    name="priority"
                    value={item?.title}
                    className={`w-5 h-5 `}
                    style={{
                      accentColor: item?.color,
                    }}
                  />
                </div>
                <label htmlFor={item?.title}>{item?.title}</label>
              </div>
            ))}
          </div>
          <button
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7 mt-12"
            onClick={() => setOpenSubModal(true)}
          >
            Submit Ticket
          </button>
          <button
            className="w-full p-4 text-blue-800 rounded-[9px] bg-white text-lg font-semibold leading-7 mt-1"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default OpenTicketModal
