import Input from '@/components/Input'
import { LabelsTwo } from '@/components/Labels'
import WrappingModal from '../WrappingModal'

const MaintenancePlansModal = ({ setOpenModal, openModal }) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 sm:px-24 xs:px-6 px-2 rounded-[20px] overflow-x-hidden">
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
              htmlFor={'website-login-url'}
              name={'Website login URL'}
            />
            <Input
              left={true}
              id={'website-login-url'}
              placeholder={'Example: https://yoursite.com/wp-admin.php?'}
              type={'text'}
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
              cnb={'rounded-[5px]'}
              cnh={'h-[58px]'}
            />
          </div>
          <div className="grid">
            <LabelsTwo htmlFor={'User-name/email'} name={'User name/Email'} />
            <Input
              left={true}
              id={'User-name/email'}
              placeholder={'Example: https://yoursite.com/wp-admin.php?'}
              type={'email'}
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
              cnb={'rounded-[5px]'}
              cnh={'h-[58px]'}
            />
          </div>
          <div className="grid">
            <LabelsTwo htmlFor={'password-project'} name={'Password'} />
            <Input
              left={true}
              id={'password-project'}
              placeholder={'Example: https://yoursite.com/wp-admin.php?'}
              type={'password'}
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
              cnb={'rounded-[5px]'}
              cnh={'h-[58px]'}
            />
          </div>

          <div className="grid gap-9 mt-10">
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
    </WrappingModal>
  )
}

export default MaintenancePlansModal
