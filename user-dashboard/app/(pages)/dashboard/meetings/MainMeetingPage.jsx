'use client'

import { AddProjectIcon, JoinMeetingIcon } from '@/staticData/Icon'
import Link from 'next/link'

const MainMeetingPage = ({ meetings }) => {
  return (
    <div className="grid w-full justify-center items-center sm:px-4 xs:px-3 px-1">
      <Link
        href={'/dashboard/meetings'}
        className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 sm:w-[260px] w-[200px] flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow border-2 border-blue-800 text-blue-800 lg:text-xl sm:text-lg text-sm font-medium"
      >
        <AddProjectIcon /> Book A New Meeting
      </Link>
      <div className="flex justify-between items-center">
        <h2 className="sm:text-2xl text-xl font-semibold">Upcoming Meetings</h2>
      </div>
      <div className="xl:w-[1000px] lg:w-full w-screen py-6 overflow-x-scroll">
        <table className="w-full border-separate md:border-spacing-y-8 sm:border-spacing-y-6 border-spacing-y-3">
          <thead className="w-full">
            <tr className="text-xl font-semibold tracking-tight text-left">
              <th>Name</th>
              <th className="text-center">Participant</th>
              <th className="text-center">Time</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {meetings?.map((item, i) => (
              <tr
                key={i}
                className="sm:text-base text-sm my-5 font-semibold py-6 px-5 bg-white tr-radius"
              >
                <td className="lg:pb-10 pb-3 pl-2">
                  <div className="flex justify-start items-center gap-3 sm:w-[350px] w-[320px] sm:text-xl text-lg font-medium">
                    {item?.name}
                  </div>
                </td>
                <td className="lg:pb-10 pb-3 text-center">
                  <div className="mx-auto w-[120px]">{item?.participant}</div>
                </td>
                <td className="lg:pb-10 pb-3 text-center">
                  <div className="mx-auto w-[120px]">{item?.time}</div>
                </td>
                <td className="lg:py-6 py-3 text-center">
                  <div className="grid gap-1 justify-center">
                    <button className="lg:w-[172px] w-[164px] h-[42px] btn-hover rounded-[5px] flex justify-center items-center gap-2 text-base mx-auto">
                      Join Meetings <JoinMeetingIcon />
                    </button>
                    <button className="text-red-600 text-[13px] font-normal underline">
                      Cancel/Reschedule Meeting
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MainMeetingPage
