'use client'

import { OpenInboxIcon } from '@/staticData/Icon'
import { setActiveMenu } from '@/store/reducers/activeReducer'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const MainFeedbackThanksPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/dashboard')
    dispatch(setActiveMenu(0))
  }

  return (
    <div className="my-24 text-center">
      <div className="grid bg-white w-[950px] py-32 justify-center items-center gap-6 rounded-[15px] mx-auto">
        <h1 className="text-zinc-700 text-[32px] font-semibold mx-auto">
          Thanks
        </h1>
        <h3 className="text-indigo-800 font-semibold">
          Your feedback has been submitted.
        </h3>
        <div className="my-4 mx-auto">
          <button
            className="w-[210px] h-11 px-[18px] py-2.5 bg-white rounded-lg shadow border border-indigo-800 text-indigo-800 text-base font-medium flex items-center justify-center gap-2"
            onClick={handleClick}
          >
            <OpenInboxIcon /> Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainFeedbackThanksPage
