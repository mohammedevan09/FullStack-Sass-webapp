'use client'

import { PasswordIcon } from '@/staticData/Icon'
import { useState } from 'react'

const Input = ({
  value,
  setValue,
  type,
  placeholder,
  id,
  cn,
  cnh,
  cnb,
  left,
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`${cn ? cn : 'sm:w-[472.44px] xs:w-[410.44px] w-[340px]'} ${
        cnh ? cnh : 'sm:h-[65px] xs:h-[58px] h-[55px]'
      } border border-zinc-400 ${cnb || 'rounded-[9px]'} ${
        left
          ? 'placeholder:text-left text-left px-4'
          : 'placeholder:text-center text-center'
      }`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export const PasswordInput = ({
  value,
  setValue,
  placeholder,
  id,
  cn,
  cnh,
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
        type={showPass}
        placeholder={placeholder}
        className=" placeholder:text-center text-center"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute right-4">
        <PasswordIcon />
      </div>
    </div>
  )
}

export default Input
