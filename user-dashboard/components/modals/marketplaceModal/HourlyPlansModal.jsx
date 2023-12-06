import Input from '@/components/Input'
import { LabelsTwo } from '@/components/Labels'

const HourlyPlansModal = ({ setOpenModal }) => {
  const services = [
    {
      title: 'UI/UX design',
    },
    {
      title: 'Elementor website design ',
    },
    {
      title: 'Divi website design',
    },
    {
      title: 'Custom theme development',
    },
    {
      title: 'Website edits, fixes & maintenance',
    },
  ]
  return (
    <div className="fixed z-40 left-0 top-0 right-0 bottom-0 modal-b-blur h-screen w-screen overflow-y-scroll">
      <div className="flex justify-center items-center my-20">
        <div className="grid bg-white pt-16 pb-4 px-24 rounded-[20px]">
          <h3 className="text-2xl font-semibold tracking-tight mx-auto">
            Provide project details & questionnaire
          </h3>
          <div className="w-full h-[0px] border border-neutral-400 mt-5 mb-14"></div>
          <div className="grid gap-5">
            <div className="grid">
              <LabelsTwo htmlFor={'project-title'} name={'Project Title'} />
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
                name={'Describe the projects.'}
              />
              <Input
                left={true}
                id={'Describe-the-projects'}
                placeholder={'Example: its an salon business in new York etc.'}
                type={'text'}
                cnb={'rounded-[5px]'}
                cnh={'h-[81.66px]'}
              />
            </div>

            <div className="grid gap-9 mt-10">
              <div className="grid gap-3">
                <LabelsTwo
                  name={
                    'Do you need a virtual meeting for this project discussion?'
                  }
                />
                <div className="grid gap-5">
                  {services?.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 text-slate-600 text-sm font-normal"
                    >
                      <Input type={'checkbox'} cn={'w-5'} cnh={'h-5'} />
                      {item?.title}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid">
                <LabelsTwo
                  name={
                    'Do you need a virtual meeting for this project discussion?'
                  }
                />
                <div className="flex gap-7">
                  <div className="flex gap-2 items-center">
                    <input
                      left={true}
                      type="radio"
                      id="yes-meeting"
                      name="virtual-meeting"
                      value="yes-meeting"
                      className="w-5 h-5"
                    />
                    <label htmlFor="yes-meeting">Yes</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      left={true}
                      type="radio"
                      id="no-meeting"
                      name="virtual-meeting"
                      value="no-meeting"
                      className="w-5 h-5"
                    />
                    <label htmlFor="no-meeting">No</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-3 mt-14">
            <button
              className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
              // onClick={() => setOpenSubModal(true)}
              onClick={() => setOpenModal(false)}
            >
              Checkout Now
            </button>
            <button
              className="w-full p-4 text-blue-800 rounded-[9px] bg-white text-lg font-semibold leading-7"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default HourlyPlansModal
