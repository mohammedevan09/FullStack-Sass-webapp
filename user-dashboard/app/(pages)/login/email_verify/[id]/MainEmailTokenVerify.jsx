'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { verifyYourEmail } from '@/api/userApi'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setEmailVerified } from '@/store/reducers/userReducer'

const MainEmailTokenVerify = ({ params, searchParams }) => {
  // console.log(params, searchParams)

  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = async () => {
    try {
      await verifyYourEmail(params?.id, searchParams?.token)
      dispatch(setEmailVerified(true))
      router.push('/dashboard')
    } catch (error) {
      toast.error('Verification Failed')
    }
  }
  return (
    <div
      className={`grid justify-center items-center overflow-x-hidden h-screen`}
    >
      <div className="grid gap-6">
        <div className="w-20 mx-auto">
          <Image
            src={'/images/wpsprint.png'}
            width={500}
            height={500}
            alt="wp sprint"
            className="h-[63.68px]"
          />
        </div>
        <div className="flex items-center justify-center mb-6 text-gray-800">
          <div className="grid justify-center items-center">
            <div className="flex gap-2">
              <span className="sm:text-[35px] text-[24px] font-bold tracking-wider">
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
        <div className="w-full grip gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full text-center bg-blue-800 text-white text-lg font-semibold py-4 rounded-lg leading-7 btn-hover"
            onClick={handleClick}
          >
            Verify Your Email
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default MainEmailTokenVerify
