'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { verifyYourEmail } from '@/api/userApi'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUsers } from '@/store/reducers/userReducer'
import { useSelector } from 'react-redux'

const MainEmailTokenVerify = ({ params, searchParams }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state?.user)

  const handleClick = async () => {
    try {
      await verifyYourEmail(params?.id, searchParams?.token)
      dispatch(setUsers({ ...userInfo, email_verified: true }))
      toast.success('Verification Successful')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Verification Failed')
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mb-6 text-gray-800">
        <div className="grid justify-center items-center">
          <div className="flex gap-2">
            <span className="sm:text-[35px] text-[24px] font-bold tracking-wider mx-auto">
              Verify Your Email
            </span>
          </div>
          <div className="w-[320px] mx-auto">
            <Image
              src={'/images/verify.png'}
              width={500}
              height={500}
              alt="wp sprint"
              className="h-[320px]"
            />
          </div>
        </div>
      </div>
      <div className="w-full grip gap-3 overflow-hidden text-center">
        <motion.button
          whileHover={{ scale: 1.07 }}
          type="submit"
          className="w-[90%] text-center bg-blue-800 text-white text-lg font-semibold py-4 rounded-lg leading-7 mx-auto"
          onClick={handleClick}
        >
          Verify Your Email
        </motion.button>
      </div>
    </>
  )
}

export default MainEmailTokenVerify
