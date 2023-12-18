import Input from '@/components/Input'
import { LabelsTwo } from '@/components/Labels'

const DesignAndDevelopmentModal = ({ setOpenModal }) => {
  return (
    <div className="fixed z-[100] left-0 top-0 right-0 bottom-0 modal-b-blur h-screen w-screen overflow-y-scroll">
      <div className="flex justify-center items-center sm:my-20 my-16">
        <div className="grid bg-white sm:pt-16 pt-8 pb-4 sm:px-24 xs:px-6 px-2 rounded-[20px] overflow-x-hidden">
          <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
            Provide project details & questionnaire
          </h3>
          <div className="w-full h-[0px] border border-neutral-400 mt-5 mb-14"></div>
          <div className="grid gap-5">
            <div className="grid justify-center">
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
            <div className="grid justify-center">
              <LabelsTwo
                htmlFor={'Describe-the-projects'}
                name={'Describe the Business/projects.'}
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
            <div className="grid justify-center gap-5">
              <Input
                left={true}
                placeholder={'What Services Do You Offer?.'}
                type={'text'}
                cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
                cnb={'rounded-[5px]'}
                cnh={'h-[58px]'}
              />
              <Input
                left={true}
                placeholder={'Who Is Your Target Audience?'}
                type={'text'}
                cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
                cnb={'rounded-[5px]'}
                cnh={'h-[58px]'}
              />
              <Input
                left={true}
                placeholder={'What Makes Your Services Unique?'}
                type={'text'}
                cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
                cnb={'rounded-[5px]'}
                cnh={'h-[58px]'}
              />
              <Input
                left={true}
                placeholder={
                  'What Features Does Your Website Need to Be Successful?'
                }
                type={'text'}
                cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
                cnb={'rounded-[5px]'}
                cnh={'h-[58px]'}
              />
              <Input
                left={true}
                placeholder={
                  'What’s your competitors site or do you have any reference site you like?'
                }
                type={'text'}
                cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
                cnb={'rounded-[5px]'}
                cnh={'h-[58px]'}
              />
              <Input
                left={true}
                placeholder={
                  'Do You Have Any Existing Style Guides and Guidelines?'
                }
                type={'text'}
                cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
                cnb={'rounded-[5px]'}
                cnh={'h-[58px]'}
              />
            </div>

            <div className="grid gap-9 mt-10">
              <div className="grid justify-start">
                <LabelsTwo
                  name={'Would You Like Us to Provide domain hosting?'}
                />
                <div className="flex gap-7">
                  <div className="flex gap-2 items-center">
                    <input
                      left={true}
                      type="radio"
                      id="yes-domain"
                      name="domain"
                      value="yes-domain"
                      className="w-5 h-5"
                    />
                    <label htmlFor="yes-domain">Yes</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      left={true}
                      type="radio"
                      id="no-domain"
                      name="domain"
                      value="no-domain"
                      className="w-5 h-5"
                    />
                    <label htmlFor="no-domain">No</label>
                  </div>
                </div>
              </div>
              <div className="grid justify-start">
                <LabelsTwo
                  name={
                    'Would You Like Us to Provide Ongoing Support and Maintenance?'
                  }
                />
                <div className="flex gap-7">
                  <div className="flex gap-2 items-center">
                    <input
                      left={true}
                      type="radio"
                      id="yes-ongoing"
                      name="ongoing"
                      value="yes-ongoing"
                      className="w-5 h-5"
                    />
                    <label htmlFor="yes-ongoing">Yes</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      left={true}
                      type="radio"
                      id="no-ongoing"
                      name="ongoing"
                      value="no-ongoing"
                      className="w-5 h-5"
                    />
                    <label htmlFor="no-ongoing">No</label>
                  </div>
                </div>
              </div>
              <div className="grid justify-start">
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

export default DesignAndDevelopmentModal
