'use client'

import {
  googleLoginUserApi,
  loginUserApi,
  registerUserApi,
} from '@/api/userApi'
import Input, { PasswordInput } from '@/components/others/Input'
import { GoogleIcon } from '@/staticData/Icon'
import { setUsers } from '@/store/reducers/userReducer'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import ErrorMessage from '@/components/others/ErrorMessage'

const MainLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state?.user)

  const handleForgotPassLink = () => {
    router.push('/login/forgot-password')
  }

  useEffect(() => {
    if (userInfo && userInfo?._id) {
      if (userInfo?.email_verified === false) {
        redirect(`/login/email_verify`)
      } else if (
        userInfo?.company_name === '' ||
        userInfo?.company_website === '' ||
        userInfo?.position === '' ||
        userInfo?.number === ''
      ) {
        redirect('/login/add-details')
      } else {
        redirect('/dashboard')
      }
    }
  }, [userInfo, router])

  return (
    <>
      <div className="flex items-center justify-center mb-6 text-gray-800">
        <div className="grid justify-center items-center">
          <div className="text-xl font-medium mx-auto ">Welcome,</div>
          <div className="flex gap-2">
            <span className="sm:text-[35px] text-[24px] font-bold ">
              To the WPS partner portal
            </span>
            <span className="sm:w-[59px] xs:w-[38px] w-[32px] mx-auto">
              <Image
                src={'/images/hello.png'}
                width={500}
                height={500}
                alt="wp sprint"
                className="sm:h-[40px] xs:h-[38px] w-[32px]"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center rounded-[20px] text-2xl font-medium mb-6">
        <button
          className={`${
            !isSignUp ? 'bg-white' : 'bg-gray-800 text-white '
          } sm:rounded-tl-[20px] rounded-tl-[15px] sm:rounded-bl-[20px] rounded-bl-[15px] border-2 border-stone-900 sm:w-[265px] xs:w-[220px] w-[170px] sm:h-[72px] xs:h-[60px] h-[55px] transition-all duration-75 ease-linear`}
          onClick={(e) => {
            e.preventDefault()
            setIsSignUp(false)
          }}
        >
          Sign in
        </button>
        <button
          className={`${
            isSignUp ? 'bg-white' : 'bg-gray-800 text-white'
          } sm:rounded-tr-[20px] rounded-tr-[15px] sm:rounded-br-[20px] rounded-br-[15px] border-2 border-stone-900 sm:w-[265px] xs:w-[220px] w-[170px] sm:h-[72px] xs:h-[60px] h-[55px] transition-all duration-75`}
          onClick={(e) => {
            e.preventDefault()
            setIsSignUp(true)
          }}
        >
          Sign up
        </button>
      </div>
      {isSignUp ? (
        <SignUp router={router} dispatch={dispatch} />
      ) : (
        <SignIn
          router={router}
          dispatch={dispatch}
          forgotPassLink={handleForgotPassLink}
        />
      )}
    </>
  )
}

export default MainLogin

export const SignIn = ({ router, dispatch, forgotPassLink }) => {
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
    // console.log(formData, isValid)
    if (isValid) {
      try {
        const data = await loginUserApi(formData)
        if (data?.response?.status === 400) {
          return toast.error(data?.response?.data)
        } else if (data?.response?.status === 401) {
          return toast.error('Invalid Credentials')
        } else if (data) {
          dispatch(setUsers(data))
          router.push('/dashboard', { scroll: true })
          toast.success('Logged in successfully!')
        }
      } catch (err) {
        toast.error('Logged in failed')
        // console.log(err)
      }
    }
  }

  return (
    <div className="w-full sm:px-7 px-4 sm:py-14 py-10 bg-white rounded-[20px] shadow gap-6 grid">
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
      <div className="flex justify-between items-center font-medium">
        <button className="flex gap-2">
          <input
            type="checkbox"
            id="rem"
            className="w-[19px] h-[19px] rounded-[5px]"
          />{' '}
          <label htmlFor="rem" className="cursor-pointer">
            Remember me
          </label>
        </button>
        <button
          className="text-gray-950 hover:text-blue-800"
          onClick={forgotPassLink}
        >
          Forgot password?
        </button>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full text-center btn-hover text-base font-semibold py-4 rounded-lg leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit(handleClick)}
          disabled={!isValid}
        >
          Sign in
        </button>
      </div>
      <GoogleLoginComp dispatch={dispatch} router={router} />
    </div>
  )
}

export const SignUp = ({ router, dispatch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // watch,
  } = useForm({
    defaultValues: {
      fullName: '',
      number: '',
      email: '',
      password: '',
      company_name: '',
      company_website: '',
      position: '',
    },
    mode: 'onChange',
  })

  const handleClick = async (formData) => {
    // console.log(formData, isValid)
    if (isValid) {
      try {
        const data = await registerUserApi(formData)
        // console.log(data)
        dispatch(setUsers(data))
        toast.success('Registration successful!')
        router.push('/dashboard', { scroll: true })
      } catch (err) {
        if (err.response.status === 401) {
          toast.error('User Already Exists!')
        } else {
          toast.error('Registration failed')
        }
      }
    }
  }
  return (
    <div className="w-full px-7 py-14 bg-white rounded-[20px] shadow gap-6 grid">
      <div className="w-full grid justify-center items-center gap-6">
        <div className="grid gap-1">
          <Input
            type="text"
            placeholder="Full Name"
            validationRules={{
              ...register('fullName', {
                required: {
                  value: true,
                  message: 'Full Name is required',
                },
              }),
            }}
          />
          <ErrorMessage errors={errors.fullName} />
        </div>
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
            placeholder="Company Name  (Optional)"
            validationRules={{
              ...register('company_name'),
            }}
          />
        </div>
        <div className="grid gap-1">
          <Input
            type="text"
            placeholder="Company Website  (Optional)"
            validationRules={{
              ...register('company_website'),
            }}
          />
        </div>
        <div className="grid gap-1">
          <Input
            type="text"
            placeholder="Position/Designation/Job title  (Optional)"
            validationRules={{
              ...register('position'),
            }}
          />
        </div>
        <div className="grid gap-1">
          <PasswordInput
            placeholder={'Choose a strong password'}
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

      <div className="w-full">
        <button
          type="submit"
          className="w-full text-center btn-hover text-base font-semibold py-4 rounded-lg leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit(handleClick)}
          disabled={!isValid}
        >
          Sign Up
        </button>
      </div>
      <GoogleLoginComp dispatch={dispatch} router={router} />
    </div>
  )
}

export const GoogleLoginComp = ({ dispatch, router }) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        )
        // console.log(res.data)

        const data = await googleLoginUserApi({
          email_verified: res?.data?.email_verified,
          email: res?.data?.email,
          fullName: res?.data?.name,
        })
        dispatch(setUsers(data))
        router.push('/login/add-details')
        toast.success('Logged in successfully!')
      } catch (err) {
        toast.error('Login Failed')
      }
    },
    onError: () => toast.error('Login Failed'),
  })

  return (
    <div className="w-full relative">
      <button
        className="w-full text-center text-base font-semibold py-4 rounded-lg border border-zinc-400 flex justify-center items-center gap-2"
        onClick={() => login()}
      >
        <GoogleIcon /> Sign Up with Google
      </button>
    </div>
  )
}
