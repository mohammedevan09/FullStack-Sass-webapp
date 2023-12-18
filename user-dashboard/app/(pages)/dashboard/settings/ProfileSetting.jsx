'use client'

import Input, { PasswordInput } from '@/components/Input'
import Labels from '@/components/Labels'

const ProfileSetting = () => {
  return (
    <div className="w-full grid justify-center items-center sm:my-20 xs:my-10 my-5">
      <div className="lg:px-7 px-5 py-14 bg-white rounded-[20px] shadow gap-6 grid lg:w-[825px] w-full">
        <div className="w-full grid justify-center items-center gap-6">
          <Labels name={'Name'} htmlFor={'name'} />
          <Input
            type="text"
            placeholder="John"
            id="name"
            cn="lg:w-[731.26px] sm:w-[500px] w-[300px]"
            cnh={'md:h-[65px] h-[50px]'}
          />
          <Labels name={'Email'} htmlFor={'email'} />
          <Input
            id="email"
            type="email"
            placeholder="John@dmarketing.com"
            cn="lg:w-[731.26px] sm:w-[500px] w-[300px]"
            cnh={'md:h-[65px] h-[50px]'}
          />
          <Labels name={'Phone'} htmlFor={'Phone'} />
          <Input
            type="number"
            id={'Phone'}
            placeholder="+130712332122"
            cn="lg:w-[731.26px] sm:w-[500px] w-[300px]"
            cnh={'md:h-[65px] h-[50px]'}
          />
          <Labels name={'Company Name'} htmlFor={'Company'} />
          <Input
            type="text"
            id={'Company Name'}
            placeholder="D-marketing"
            cn="lg:w-[731.26px] sm:w-[500px] w-[300px]"
            cnh={'md:h-[65px] h-[50px]'}
          />
          <Labels name={'Website'} htmlFor={'Website'} />
          <Input
            type="text"
            id={'Website'}
            placeholder="D-marketing.com"
            cn="lg:w-[731.26px] sm:w-[500px] w-[300px]"
            cnh={'md:h-[65px] h-[50px]'}
          />
          <Labels name={'Position/Job'} htmlFor={'Position/Job'} />
          <Input
            id={'Position/Job title'}
            type="text"
            placeholder="Marketing Manager"
            cn="lg:w-[731.26px] sm:w-[500px] w-[300px]"
            cnh={'md:h-[65px] h-[50px]'}
          />
          <Labels name={'Change password'} htmlFor={'changePass'} />
          <PasswordInput
            id={'changePass'}
            placeholder={'New Password'}
            cn="lg:w-[731.26px] sm:w-[500px] w-[300px]"
            cnh={'md:h-[65px] h-[50px]'}
          />
        </div>

        <div className="w-full">
          <button className="w-full text-center text-white text-base font-semibold bg-blue-800 md:py-4 py-2 rounded-lg leading-7">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetting
