'use client'

import Input, { PasswordInput } from '@/components/Input'
import Labels from '@/components/Labels'

const ProfileSetting = () => {
  return (
    <div className="w-full grid justify-center items-center my-16">
      <div className="px-7 py-14 bg-white rounded-[20px] shadow gap-6 grid w-[825px]">
        <div className="w-full grid justify-center items-center gap-6">
          <Labels name={'Name'} htmlFor={'name'} />
          <Input type="text" placeholder="John" id="name" cn="w-[731.26px]" />
          <Labels name={'Email'} htmlFor={'email'} />
          <Input
            id="email"
            type="email"
            placeholder="John@dmarketing.com"
            cn="w-[731.26px]"
          />
          <Labels name={'Phone'} htmlFor={'Phone'} />
          <Input
            type="number"
            id={'Phone'}
            placeholder="+130712332122"
            cn="w-[731.26px]"
          />
          <Labels name={'Company Name'} htmlFor={'Company'} />
          <Input
            type="text"
            id={'Company Name'}
            placeholder="D-marketing"
            cn="w-[731.26px]"
          />
          <Labels name={'Website'} htmlFor={'Website'} />
          <Input
            type="text"
            id={'Website'}
            placeholder="D-marketing.com"
            cn="w-[731.26px]"
          />
          <Labels name={'Position/Job'} htmlFor={'Position/Job'} />
          <Input
            id={'Position/Job title'}
            type="text"
            placeholder="Marketing Manager"
            cn="w-[731.26px]"
          />
          <Labels name={'Change password'} htmlFor={'changePass'} />
          <PasswordInput
            id={'changePass'}
            placeholder={'New Password'}
            cn="w-[731.26px]"
          />
        </div>

        <div className="w-full">
          <button className="w-full text-center text-white text-base font-semibold bg-blue-800 py-4 rounded-lg leading-7">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetting
