'use client'

import { PasswordInput } from '@/components/Input'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { resetPasswordApi } from '@/api/userApi'
import { useDispatch } from 'react-redux'
import { setUsers } from '@/store/reducers/userReducer'

const ResetPassword = ({ params, searchParams }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const password = watch('password')

  const handleClick = async (formData) => {
    // console.log(formData)
    if (isValid) {
      try {
        toast.loading('Changing on process!', { duration: 1000 })
        const data = await resetPasswordApi(
          params?.id,
          searchParams?.token,
          formData
        )
        dispatch(setUsers(data?.data))
        toast.success('Password changed!')
        router.push('/dashboard')
      } catch (err) {
        toast.error('Sorry token expired! Go back and try again')
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mb-6 text-gray-800">
        <div className="grid justify-center items-center">
          <span className="sm:text-[35px] text-[24px] font-bold mx-auto">
            Add a new password
          </span>
          <div className="w-full sm:px-7 px-4 sm:py-10 py-8 bg-white rounded-[20px] shadow gap-6 grid mt-5">
            <div className="grid gap-1">
              <PasswordInput
                placeholder={'Type a new password'}
                validationRules={{
                  ...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    minLength: {
                      value: 8,
                      message: 'Password length must be at least 8 characters',
                    },
                  }),
                }}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm font-bold">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <PasswordInput
                placeholder="Confirm you password"
                validationRules={{
                  ...register('confirmPassword', {
                    required: {
                      value: true,
                      message: 'Confirm password is required',
                    },
                    validate: (value) => {
                      if (value !== password) {
                        return 'Passwords do not match'
                      }
                    },
                  }),
                }}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-sm font-bold">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grip gap-3 overflow-hidden text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-[90%] text-center bg-blue-800 text-white text-2xl font-semibold py-4 rounded-lg leading-7"
          onClick={handleSubmit(handleClick)}
        >
          Done
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

export default ResetPassword
