import Labels from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'

const StatusModal = ({ serviceData, handleClick, openModal, setOpenModal }) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <h3 className="sm:text-3xl text-xl font-semibold tracking-tight mb-8">
          Do you want to {!serviceData?.isActive ? 'On' : 'Off'} this status?
        </h3>
        <div className="grid gap-2">
          <Labels
            htmlFor={'isActive'}
            name={`After you ${
              !serviceData?.isActive ? 'Active' : 'Inactive'
            } this status it will ${
              !serviceData?.isActive ? 'Show' : 'not show'
            } on the main website!`}
          />
        </div>

        <div className="flex items-center gap-3 mt-5 mb-3">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full py-2 text-blue-800 rounded-[9px] text-lg font-semibold leading-7"
            onClick={() => {
              setOpenModal(false)
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-2 bg-blue-600 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={handleClick}
          >
            {!serviceData?.isActive ? 'Active' : 'Inactive'}
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default StatusModal
