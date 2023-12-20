import Input from '@/components/Input'
import { LabelsTwo } from '@/components/Labels'
import WrappingModal from '../WrappingModal'

const GetACustomProposalModal = ({
  setOpenSubModal,
  setOpenModal,
  openModal,
}) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 sm:px-24 xs:px-6 px-2 overflow-x-hidden rounded-[20px]">
        <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
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
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
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
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
              cnb={'rounded-[5px]'}
              cnh={'h-[81.66px]'}
            />
          </div>
          <div className="grid">
            <LabelsTwo htmlFor={'budget'} name={'Budget'} />
            <Input
              left={true}
              id={'budget'}
              placeholder={'Ex: 800-1000$'}
              type={'text'}
              cnb={'rounded-[5px]'}
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
              cnh={'h-[58px]'}
            />
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
                  id="yes"
                  name="virtual-meeting"
                  value="yes"
                  className="w-5 h-5"
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  left={true}
                  type="radio"
                  id="no"
                  name="virtual-meeting"
                  value="no"
                  className="w-5 h-5"
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-3 mt-14">
          <button
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={(e) => {
              e.stopPropagation()
              setOpenSubModal(true)
            }}
          >
            Send me a custom proposal
          </button>
          <button
            className="w-full p-4 text-blue-800 rounded-[9px] bg-white text-lg font-semibold leading-7"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default GetACustomProposalModal
