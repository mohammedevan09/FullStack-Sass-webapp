'use client'

import { useDispatch } from 'react-redux'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { logoutUserApi } from '@/api/userApi'
import toast from 'react-hot-toast'
import { setUsers } from '@/store/reducers/userReducer'

const LogoutModal = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogoutClick = async (e) => {
    e.preventDefault()
    await logoutUserApi()
    dispatch(setUsers({}))
    router.push('/login')
    toast.success('Logout Successfully!')
    setOpenModal(false)
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white sm:pt-10 pt-8 pb-4 sm:px-24 xs:px-6 px-4 rounded-[9px] overflow-x-hidden">
        <h2 className="text-gray-900 text-xl font-medium leading-7">
          Are your sure you want to logout?
        </h2>
        <div className="flex w-full gap-3 mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-2 px-3 text-base font-medium rounded-lg shadow border border-gray-300"
            onClick={(e) => {
              e.preventDefault()
              setOpenModal(false)
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-2 px-3 text-base font-medium rounded-lg shadow bg-blue-800 text-white"
            onClick={handleLogoutClick}
          >
            Logout
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default LogoutModal
