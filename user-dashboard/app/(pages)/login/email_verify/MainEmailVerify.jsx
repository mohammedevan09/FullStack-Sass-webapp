'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { setUsers } from '@/store/reducers/userReducer'
import { logoutUserApi, sendEmailVerificationApi } from '@/api/userApi'
import toast from 'react-hot-toast'

const MainEmailVerify = () => {
  const [isDisable, setIsDisable] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  const { userInfo } = useSelector((state) => state?.user)

  useEffect(() => {
    if (userInfo && userInfo?.email_verified === true) {
      router?.push('/dashboard')
    } else if (!userInfo?._id) {
      router?.push('/login')
    }
  }, [userInfo, router])

  const handleClick = async () => {
    try {
      toast.loading('Processing', { duration: 1500 })
      await sendEmailVerificationApi({
        email: userInfo?.email,
        _id: userInfo?._id,
      })
      setIsDisable(true)
      toast.success('Check Your Email')
    } catch (error) {
      toast.error('Sorry cannot verify email, Try again Later')
    }
  }

  const handleBack = async () => {
    await logoutUserApi()
    dispatch(setUsers({}))
    router.push('/login')
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
            <h1 className="text-xl font-medium mx-auto ">Welcome,</h1>
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
        {isDisable && (
          <div className="bg-blue-500 bg-opacity-20 py-3 px-3 text-xl font-medium">
            Verification send, Please Check your Email
          </div>
        )}
        <div className="w-full grip gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full text-center bg-blue-800 text-white text-lg font-semibold py-4 rounded-lg leading-7 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleClick}
            disabled={isDisable}
          >
            Send Verification Email
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            type="submit"
            className="w-full text-center text-blue-800 font-semibold pt-4 rounded-lg leading-7 text-xl"
            onClick={handleBack}
          >
            Back To Login
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default MainEmailVerify
