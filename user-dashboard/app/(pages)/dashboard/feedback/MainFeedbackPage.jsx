'use client'

import { useRouter } from 'next/navigation'

const MainFeedbackPage = () => {
  const options = [
    {
      title: 'Issue 1',
    },
    {
      title: 'Issue 2',
    },
    {
      title: 'Issue 3',
    },
    {
      title: 'Others',
    },
  ]

  const router = useRouter()
  return (
    <div className="flex justify-center items-center w-full">
      <div className="grid items-center justify-center sm:py-8 py-4 bg-white xs:px-9 px-2 rounded-[15px] my-28">
        <h1 className="lg:w-[580px] sm:w-[380px] w-[320px] text-center lg:text-[32px] sm:text-2xl text-xl font-semibold mx-auto">
          We’re always open to improve our partner’s experience & our services
        </h1>
        <h3 className="lg:text-xl sm:text-base text-sm lg:my-7 my-5 lg:w-[510px] sm:w-[370px] w-[310px] mx-auto text-center">
          Fillout the form & let us know how we can improve the services & our
          partner portal experience
        </h3>
        <div className="text-slate-700 lg:text-xl sm:text-lg xs:text-base text-sm font-semibold grid gap-3">
          <label htmlFor="issue">Select an issues</label>
          <select
            name="issue"
            id="issue"
            className="lg:w-[800px] sm:w-[500px] w-[340px] outline-none border border-gray-300 p-3 rounded-[5px]"
          >
            <option value="" disabled selected>
              Select an issues
            </option>
            {options?.map((item, i) => {
              return (
                <option key={i} className="py-2" value={item?.title}>
                  {item?.title}
                </option>
              )
            })}
          </select>
          <label htmlFor="Details">Details</label>
          <textarea
            name="Details"
            id="Details"
            cols="30"
            rows="4"
            className="border border-gray-300 outline-none rounded-[5px] p-3"
          ></textarea>
        </div>
        <button
          className="w-full text-center text-white text-base font-semibold bg-blue-800 md:py-4 py-2 rounded-lg leading-7 mt-8"
          onClick={() => router.push('/dashboard/feedback/thanks')}
        >
          Send Feedback
        </button>
      </div>
    </div>
  )
}

export default MainFeedbackPage
