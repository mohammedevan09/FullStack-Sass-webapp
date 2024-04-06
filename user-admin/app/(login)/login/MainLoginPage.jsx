'use client'

import { adminLoginApi } from '@/api/userApi'
import ErrorMessage from '@/components/others/ErrorMessage'
import Input, { PasswordInput } from '@/components/others/Input'
import { setUsers } from '@/store/reducers/userReducer'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const MainLoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { userInfo } = useState((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const handleClick = async (formData) => {
    if (isValid) {
      try {
        const data = await adminLoginApi(formData)
        dispatch(setUsers(data))
        router.push('/', { scroll: true })
        toast.success(`Welcome admin - ${data?.fullName}`)
      } catch (err) {
        toast.error('No Admin found')
      }
    }
  }

  useEffect(() => {
    if (userInfo && userInfo?._id) {
      redirect('/')
    }
  }, [userInfo, router])

  return (
    <div>
      <div className="flex items-center justify-center sm:mb-14 mb-6 text-gray-800">
        <div className="grid justify-center items-center">
          <div className="text-center">
            <div className="w-[170px] mx-auto mb-2">
              <Image
                src={'/images/logo2.png'}
                width={500}
                height={500}
                alt="wp sprint"
                className="h-full"
              />
            </div>
            <h2 className="font-bold sm:text-4xl text-3xl">
              Welcome, Login as an Admin
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full sm:px-7 px-4  sm:py-14 py-10 bg-white rounded-[20px] shadow gap-6 grid">
        <div className="w-full grid justify-center items-center sm:gap-6 gap-4">
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
          <div className="grid gap-1">
            <PasswordInput
              placeholder={'Password'}
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
            <ErrorMessage errors={errors?.password} />
          </div>
        </div>
        <div className="flex justify-start items-center font-medium">
          <button
            className="text-gray-950 hover:text-blue-800"
            //   onClick={forgotPassLink}
          >
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full text-center btn-hover text-base font-semibold py-2 rounded-lg leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit(handleClick)}
          disabled={!isValid}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default MainLoginPage
