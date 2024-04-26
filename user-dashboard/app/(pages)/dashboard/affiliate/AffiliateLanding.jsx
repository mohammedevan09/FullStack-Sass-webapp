'use client'

import { createAffiliateApi } from '@/api/affiliateApi'
import { DollarSignButtonIcon } from '@/staticData/Icon'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const AffiliateLanding = () => {
  const { userInfo } = useSelector((state) => state?.user)

  const handleClick = async (e) => {
    e.preventDefault()
    await toast.promise(createAffiliateApi({ userId: userInfo?._id }), {
      loading: 'Creating Affiliate Account',
      success: <b>Affiliate Account Created</b>,
      error: <b>Affiliate Account Creation failed</b>,
    })
    window.location.reload()
  }

  return (
    <div className="flex items-center mb-6 text-gray-800">
      <div className="grid items-center w-full">
        <div className="flex items-center justify-start">
          <h1 className="md:text-4xl sm:text-3xl text-[24px] font-bold tracking-wide">
            Refer a Friend and Starts Earning
          </h1>
          <div>
            <DollarSignButtonIcon size={'50'} color={'#0606ffc7'} />
          </div>
        </div>
        <div className="grid bg-white rounded-2xl my-6">
          <div className="md:flex grid justify-around items-center p-10">
            <div className="w-full">
              <h1
                className="md:text-5xl sm:text-4xl text-2xl font-bold"
                style={{
                  background: '-webkit-linear-gradient(#0035ffa3, #333)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Join our growing affiliate program & start promoting!
              </h1>
              <button
                className="bg-blue-800 text-white font-semibold py-2 px-7 rounded-md text-xl hover:scale-105 transition mt-8"
                onClick={handleClick}
              >
                Create Affiliate Account
              </button>
            </div>
            <div className="w-full">
              <Image
                src={'/images/affiliate.jpg'}
                width={500}
                height={500}
                alt="wp sprint"
                className="h-auto rounded-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AffiliateLanding
