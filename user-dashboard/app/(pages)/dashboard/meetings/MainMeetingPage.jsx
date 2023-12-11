'use client'

import { AddProjectIcon, JoinMeetingIcon } from '@/staticData/Icon'
import Link from 'next/link'

const MainMeetingPage = ({ meetings }) => {
  return (
    <div className="grid w-full justify-center">
      <Link
        href={'/dashboard/meetings'}
        className="mt-16 mb-14 px-[14px] py-3 w-[260px] flex items-center justify-center gap-2 rounded-lg shadow border-2 border-blue-800 text-blue-800 text-xl font-medium"
      >
        <AddProjectIcon /> Book A New Meeting
      </Link>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Upcoming Meetings</h2>
      </div>
      <div className="w-full rounded-[20.37px] py-8 grid justify-between items-center gap-12">
        <div className="flex justify-between items-center text-xl font-semibold pb-6 pt-2 border-b border-stone-300">
          <h2 className="w-[350px]">Name</h2>
          <h2 className="w-[200px] text-center">Participant</h2>
          <h2 className="w-[200px] text-center">Time</h2>
          <h2 className="w-[200px] text-center">Action</h2>
        </div>
        {meetings?.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-start text-base font-semibold py-6 px-5 bg-white rounded-[15px]"
          >
            <div className="w-[350px] text-xl">{item?.name}</div>
            <div className="w-[200px] text-center">{item?.participant}</div>
            <div className="w-[200px] text-center">{item?.time}</div>
            <div className="grid gap-1 w-[200px] text-center">
              <button className="w-[172px] h-[42px] bg-blue-800 rounded-[5px] flex justify-center items-center text-white gap-2 text-base mx-auto">
                Join Meetings <JoinMeetingIcon />
              </button>
              <button className="text-red-600 text-[13px] font-normal underline">
                Cancel/Reschedule Meeting
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainMeetingPage
