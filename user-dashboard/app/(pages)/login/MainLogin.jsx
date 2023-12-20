'use client'

import Input, { PasswordInput } from '@/components/Input'
import { GoogleIcon } from '@/staticData/Icon'
import Image from 'next/image'
import { useState } from 'react'

const MainLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  //   const [email, setEmail] = useState('')
  //   const [password, setPassword] = useState('')
  return (
    <div className={`grid justify-center items-center my-10 overflow-x-hidden`}>
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
            <div className="text-xl font-medium mx-auto ">Welcome,</div>
            <div className="flex gap-2">
              <span className="sm:text-[35px] text-[24px] font-bold ">
                To the WPS partner portal
              </span>
              <span className="sm:w-[49px] xs:w-[38px] w-[32px] mx-auto">
                <Image
                  src={'/images/hello.png'}
                  width={500}
                  height={500}
                  alt="wp sprint"
                  className="sm:h-[49px] xs:h-[38px] w-[32px]"
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
        {isSignUp ? <SignUp /> : <SignIn />}
      </div>
    </div>
  )
}

export default MainLogin

export const SignIn = () => {
  return (
    <div className="w-full sm:px-7 px-4 sm:py-14 py-10 bg-white rounded-[20px] shadow gap-6 grid">
      <div className="w-full grid justify-center items-center gap-6">
        <Input
          type="text"
          placeholder="Email Address"
          //   value={email}
          //   setValue={setEmail}
        />
        <Input type="password" placeholder="Password" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="rem"
            className="w-[19px] h-[19px] rounded-[5px]"
          />{' '}
          <label htmlFor="rem">Remember me</label>
        </div>
        <div className="text-gray-950 font-normal">Forgot password?</div>
      </div>
      <div className="w-full">
        <button className="w-full text-center btn-hover text-base font-semibold py-4 rounded-lg leading-7">
          Sign In
        </button>
      </div>
      <div className="w-full">
        <button className="w-full text-center text-base font-semibold py-4 rounded-lg border border-zinc-400 flex justify-center items-center gap-2">
          <GoogleIcon /> Sign in with Google
        </button>
      </div>
    </div>
  )
}

export const SignUp = () => {
  return (
    <div className="w-full px-7 py-14 bg-white rounded-[20px] shadow gap-6 grid">
      <div className="w-full grid justify-center items-center gap-6">
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="number" placeholder="Phone Number" />
        <Input type="text" placeholder="Company Name" />
        <Input type="text" placeholder="Company Website" />
        <Input type="text" placeholder="Position/Designation/Job title" />
        <PasswordInput placeholder={'Choose a strong password'} />
      </div>

      <div className="w-full">
        <button className="w-full text-center btn-hover text-base font-semibold py-4 rounded-lg leading-7">
          Sign Up
        </button>
      </div>
      <div className="w-full">
        <button className="w-full text-center text-base font-semibold py-4 rounded-lg border border-zinc-400 flex justify-center items-center gap-2">
          <GoogleIcon /> Sign Up with Google
        </button>
      </div>
    </div>
  )
}
