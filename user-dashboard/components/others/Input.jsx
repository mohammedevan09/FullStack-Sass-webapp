'use client'

import { PasswordIcon, PasswordIconClosed } from '@/staticData/Icon'
import { useState } from 'react'

const Input = ({
  type,
  placeholder,
  id,
  cn,
  cnh,
  cnb,
  left,
  validationRules,
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${cn ? cn : 'sm:w-[472.44px] xs:w-[410.44px] w-[340px]'} ${
          cnh ? cnh : 'sm:h-[65px] xs:h-[58px] h-[55px]'
        } border border-zinc-400 font-medium placeholder:font-normal ${
          cnb || 'rounded-[9px]'
        } ${
          left
            ? 'placeholder:text-left text-left px-4'
            : 'placeholder:text-center text-center'
        }`}
        {...validationRules}
      />
    </>
  )
}

export const Input2 = ({
  type,
  placeholder,
  id,
  validationRules,
  className,
  name,
  value,
  readOnly,
}) => {
  return (
    <>
      <input
        name={name}
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-[50px] border  border-zinc-400 font-medium placeholder:font-normal rounded-md placeholder:text-center text-center px-3 ${className}`}
        {...validationRules}
      />
    </>
  )
}

export const PasswordInput = ({
  placeholder,
  id,
  cn,
  cnh,
  validationRules,
  readOnlyPassword,
}) => {
  const [showPass, setShowPass] = useState()
  return (
    <div
      className={`${cn ? cn : 'sm:w-[472.44px] xs:w-[410.44px] w-[340px]'} ${
        cnh ? cnh : 'sm:h-[65px] xs:h-[58px] h-[55px]'
      } border border-zinc-400 rounded-[9px] text-center flex justify-center items-center relative`}
    >
      <input
        id={id}
        type={showPass ? 'text' : 'password'}
        placeholder={placeholder}
        className=" placeholder:text-center text-center font-medium placeholder:font-normal"
        readOnly={readOnlyPassword}
        {...validationRules}
      />
      <div
        className="absolute right-4 cursor-pointer"
        onClick={() => setShowPass((prev) => !prev)}
      >
        {showPass ? <PasswordIcon /> : <PasswordIconClosed />}
      </div>
    </div>
  )
}

export default Input
