'use client'

import { loginTeamApi } from '@/api/teamApi'
import ErrorMessage from '@/components/others/ErrorMessage'
import Input, { PasswordInput } from '@/components/others/Input'
import { TeamMemberIcon } from '@/staticData/Icon'
import { setUsers } from '@/store/reducers/userReducer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const MainTeamMemberLogin = () => {
  const dispatch = useDispatch()
  const router = useRouter()

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
        const data = await loginTeamApi(formData)
        if (data?.response?.status === 400) {
          return toast.error(data?.response?.data)
        } else if (data?.response?.status === 401) {
          return toast.error('Invalid Credentials')
        } else if (data?.role === 'adminMember') {
          dispatch(setUsers(data))
          router.push('/', { scroll: true })
          toast.success('Logged in successfully!')
        }
      } catch (err) {
        toast.error('No Admin Team Member found!')
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center sm:mb-14 mb-6 text-gray-800">
        <div className="grid justify-center items-center text-center">
          <h2 className="font-bold sm:text-4xl text-3xl">
            Welcome, Login as an Team Member
          </h2>
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
          <button
            type="submit"
            className="w-full text-center btn-hover text-base font-semibold py-2 rounded-lg leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleClick)}
            disabled={!isValid}
          >
            Sign in as Team Member
          </button>
          <div className="flex gap-2 items-center text-sm">
            <div className="bg-gray-300 w-full h-[1px]"></div>
            <div>OR</div>
            <div className="bg-gray-300 w-full h-[1px]"></div>
          </div>
          <Link
            href={'/login'}
            className="w-full text-center text-base font-semibold py-4 rounded-lg border border-zinc-400 flex justify-center items-center gap-2"
          >
            <TeamMemberIcon /> Login as a user
          </Link>
        </div>
      </div>
    </>
  )
}

export default MainTeamMemberLogin
