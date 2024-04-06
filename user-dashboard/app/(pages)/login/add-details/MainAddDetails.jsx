'use client'

import Input from '@/components/others/Input'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { updateUserApi } from '@/api/userApi'
import toast from 'react-hot-toast'
import { setUsers } from '@/store/reducers/userReducer'
import ErrorMessage from '@/components/others/ErrorMessage'

const MainAddDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // watch,
  } = useForm({
    defaultValues: {
      number: userInfo?.number || '',
      company_name: userInfo?.company_name || '',
      company_website: userInfo?.company_website || '',
      position: userInfo?.position || '',
    },
    mode: 'onChange',
  })

  const handleClick = async (formData) => {
    // console.log(formData, isValid)
    if (isValid) {
      try {
        const data = await updateUserApi(formData, userInfo?.token)
        console.log(data)
        toast('Well done!', {
          icon: '🚀',
        })
        dispatch(setUsers(data))
        // router.push('/dashboard')
      } catch (err) {
        toast.error('Update failed')
      }
    }
  }

  useEffect(() => {
    if (!userInfo?._id) {
      redirect('/login')
    }
  }, [userInfo, router])

  return (
    <>
      <div className="flex items-center justify-center mb-6 text-gray-800">
        <div className="grid justify-center items-center">
          <div className="text-xl font-medium mx-auto ">Welcome,</div>
          <span className="sm:text-[35px] text-[24px] font-bold text-center px-2">
            One More Step And You Are Good To Go🚀
          </span>
        </div>
      </div>
      <div className="w-full sm:px-7 px-4 sm:pt-14 pt-10 sm:pb-8 pb-6 bg-white rounded-[20px] shadow gap-6 grid">
        <div className="w-full grid justify-center items-center sm:gap-6 gap-4">
          <div className="grid gap-1">
            <Input
              type="number"
              placeholder="Phone Number"
              validationRules={{
                ...register('number', {
                  required: {
                    value: true,
                    message: 'Phone number is required',
                  },
                  minLength: {
                    value: 6,
                    message: 'Phone no. length must be at least 6 characters',
                  },
                  maxLength: {
                    value: 13,
                    message: 'Phone no. length must be at least 13 characters',
                  },
                }),
              }}
            />

            <ErrorMessage errors={errors?.number} />
          </div>
          <div className="grid gap-1">
            <Input
              type="text"
              placeholder="Company Name (Optional)"
              validationRules={{
                ...register('company_name'),
              }}
            />
          </div>
          <div className="grid gap-1">
            <Input
              type="text"
              placeholder="Company Website (Optional)"
              validationRules={{
                ...register('company_website'),
              }}
            />
          </div>
          <div className="grid gap-1">
            <Input
              type="text"
              placeholder="Position/Designation/Job title (Optional)"
              validationRules={{
                ...register('position'),
              }}
            />
          </div>
        </div>

        <div className="w-full grip gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full text-center bg-blue-800 text-white text-base font-semibold py-4 rounded-lg leading-7"
            onClick={handleSubmit(handleClick)}
          >
            Next
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            type="submit"
            className="w-full text-center text-blue-800 font-semibold pt-4 rounded-lg leading-7 text-xl"
            onClick={() => router.push('/dashboard')}
          >
            Skip
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default MainAddDetails
