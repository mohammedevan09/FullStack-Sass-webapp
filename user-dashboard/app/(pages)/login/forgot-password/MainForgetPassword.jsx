'use client'

import { forgotPasswordApi } from '@/api/userApi'
import ErrorMessage from '@/components/ErrorMessage'
import Input from '@/components/Input'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const MainForgetPassword = () => {
  const [isDisable, setIsDisable] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const handleClick = async (formData) => {
    if (isValid) {
      try {
        toast.loading('Processing', { duration: 1500 })
        const data = await forgotPasswordApi(formData)
        // console.log(data)
        setIsDisable(true)
        toast.success('Recovery Message send to your email!')
      } catch (err) {
        toast.error('Sorry cannot recover now! Try again Later.')
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mb-6 text-gray-800">
        <div className="grid justify-center items-center">
          <span className="sm:text-[35px] text-[24px] font-bold mx-auto">
            Enter your email to recover
          </span>
          <div className="w-full sm:px-7 px-4 sm:py-10 py-8 bg-white rounded-[20px] shadow gap-6 grid mt-5">
            <div className="grid gap-1">
              <Input
                type="text"
                placeholder="Email Address"
                validationRules={{
                  ...register('email', {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Enter a valid email',
                    },
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  }),
                }}
              />
              <ErrorMessage errors={errors?.email} />
            </div>
          </div>
        </div>
      </div>
      {isDisable && (
        <div className="bg-blue-500 bg-opacity-20 py-3 px-3 text-lg font-medium mx-auto text-center w-[90%]">
          Reset Password token send, Please Check your Email
        </div>
      )}
      <div className="w-full grip gap-3 overflow-hidden text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-[90%] text-center bg-blue-800 text-white text-lg font-semibold py-4 rounded-lg leading-7 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSubmit(handleClick)}
          disabled={isDisable || !isValid}
        >
          Send recovery email
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          type="submit"
          className="w-full text-center text-blue-800 font-semibold pt-4 rounded-lg leading-7 text-xl"
          onClick={() => router.push('/login')}
        >
          Back To Login
        </motion.button>
      </div>
    </>
  )
}

export default MainForgetPassword
