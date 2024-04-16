'use client'

import {
  ordersData,
  projectData,
  someIconImages,
  statisticsData,
  ticketsData,
} from '@/staticData/MainData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Main = () => {
  const router = useRouter()

  return (
    <>
      <div className="w-full sm:px-4 xs:px-3 px-1">
        <div className="flex items-end sm:my-12 my-6">
          <div className="grid">
            <span className="text-gray-800 text-xl font-medium ">
              Hi, Olivia S
            </span>

            <span className="text-gray-800 text-[35px] font-bold ">
              Good Afternoon{' '}
            </span>
          </div>
          <span className="w-[49px] ml-2 mb-3">
            <Image
              src={'/images/hello.png'}
              width={500}
              height={500}
              alt="wp sprint"
              className="h-[49px]"
            />
          </span>
        </div>
        <div>
          <h4 className="text-neutral-700 text-2xl font-medium mb-[31px]">
            Statistics
          </h4>
          <div className="sm:flex grid sm:justify-between items-center text-white 2xl:gap-4 gap-2">
            {statisticsData?.map((item, i) => (
              <div
                key={i}
                className="flex justify-center items-center 2xl:gap-12 gap-6 2xl:w-[360px] lg:w-[270px] w-full 2xl:h-[171px] lg:h-[140px] h-[120px] gradient"
              >
                <div className="2xl:w-[58px] md:w-[40px] sm:w-[34px] w-[46px]">
                  {item?.image}
                </div>
                <div className="grid lg:gap-5 gap-2">
                  <h3 className="2xl:text-[25px] lg:text-[20px] text-[16px] font-normal">
                    {item?.title}
                  </h3>
                  <h2 className="2xl:text-[40px] lg:text-[30px] text-[25px] font-medium">
                    {item?.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-neutral-700 text-2xl font-medium mb-[31px] mt-[50px]">
            Orders
          </h4>
          <div className="sm:flex grid sm:justify-between items-center text-white gap-3">
            {ordersData?.map((item, i) => (
              <div
                key={i}
                className="grid justify-start items-center 2xl:w-[360px] lg:w-[270px] w-full 2xl:h-[171px] h-[140px] bg-white rounded-[20px] px-5 py-6"
              >
                <div className="w-[37px] h-10 p-0.5 flex-col justify-center items-start gap-2.5 inline-flex bg-[#C8E5FB]">
                  {someIconImages[i]}
                </div>
                <div className="grid sm:gap-2 gap-1">
                  <h3 className="text-black lg:text-[22px] text-[20px] font-semibold">
                    {item?.title}
                  </h3>
                  <h2 className="text-black text-base font-normal">
                    {item?.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-neutral-700 text-2xl font-medium mb-[31px] mt-[50px]">
            Tickets
          </h4>
          <div className="sm:flex grid sm:justify-between items-center text-white gap-3">
            {ticketsData?.map((item, i) => (
              <div
                key={i}
                className="grid justify-start items-center 2xl:w-[360px] lg:w-[270px] w-full 2xl:h-[171px] h-[140px] bg-white rounded-[20px] px-5 py-6"
              >
                <div className="w-[37px] h-10 p-0.5 flex-col justify-center items-start gap-2.5 inline-flex bg-[#C8E5FB]">
                  {someIconImages[i]}
                </div>
                <div className="grid sm:gap-2 gap-1">
                  <h3 className="text-black lg:text-[22px] text-[20px] font-semibold">
                    {item?.title}
                  </h3>
                  <h2 className="text-black text-base font-normal">
                    {item?.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-full w-screen bg-white rounded-[20.37px] px-7 py-8 sm:my-14 my-10 overflow-x-scroll">
        <table className="w-full">
          <tbody>
            <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Projects Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Track</th>
            </tr>

            {projectData?.map((item, i) => (
              <tr key={i}>
                <td className="lg:py-7 py-4">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 w-[90px]">
                    #{item?.orderId}
                  </div>
                </td>
                <td className="lg:py-7 py-4 2xl:w-[350px] w-[300px]">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-full w-[270px]">
                    {item?.name}
                  </div>
                </td>
                <td className="lg:py-7 py-4 text-center">
                  <div
                    className={`lg:w-[127px] w-[96px] h-[34px] mx-auto bg-opacity-20 rounded-[20px] flex justify-center items-center lg:gap-2 gap-[6px] ${
                      item?.status?.toLocaleLowerCase() === 'pending'
                        ? 'bg-rose-600'
                        : item?.status?.toLocaleLowerCase() === 'done'
                        ? 'bg-green-500'
                        : 'bg-blue-600'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        item?.status?.toLocaleLowerCase() === 'pending'
                          ? 'bg-rose-600'
                          : item?.status?.toLocaleLowerCase() === 'done'
                          ? 'bg-green-500'
                          : 'bg-blue-600'
                      }`}
                    />
                    {item?.status}
                  </div>
                </td>
                <td className="lg:py-7 py-4 text-center">
                  <div className="lg:w-full w-[150px] mx-auto">
                    {item?.progress}
                  </div>
                </td>
                <td className="lg:py-7 py-4 text-center">
                  <button
                    className="w-[100px] h-[34px] btn-hover rounded-[10px] text-center"
                    onClick={() =>
                      router.push(`/dashboard/all-projects/${item?.orderId}`)
                    }
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Main
