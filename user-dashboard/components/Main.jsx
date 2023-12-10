'use client'

import { OrderIcon } from '@/staticData/Icon'
import {
  ordersData,
  projectData,
  statisticsData,
  ticketsData,
} from '@/staticData/MainData'
import { setActiveMenu } from '@/store/reducers/activeReducer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const Main = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <div className="w-full">
      <div className="flex items-end my-12">
        <div className="grid">
          <span className="text-gray-800 text-xl font-medium ">
            HI, Olivia S
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
        <div className="flex justify-between items-center text-white">
          {statisticsData?.map((item, i) => (
            <div
              key={i}
              className="flex justify-center items-center gap-12 w-[360px] h-[171px] gradient"
            >
              <div className="w-[58px]">{item?.image}</div>
              <div className="grid gap-5">
                <h3 className="text-[25px] font-normal">{item?.title}</h3>
                <h2 className="text-[40px] font-medium">{item?.value}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-neutral-700 text-2xl font-medium mb-[31px] mt-[50px]">
          Orders
        </h4>
        <div className="flex justify-between items-center text-white">
          {ordersData?.map((item, i) => (
            <div
              key={i}
              className="grid justify-start items-center w-[360px] h-[171px] bg-white rounded-[20px] px-5 py-6"
            >
              <div className="w-[43px] h-10 p-2.5 flex-col justify-start items-start gap-2.5 inline-flex bg-[#C8E5FB]">
                <OrderIcon />
              </div>
              <div className="grid gap-2">
                <h3 className="text-black text-[22px] font-semibold">
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
        <div className="flex justify-between items-center text-white">
          {ticketsData?.map((item, i) => (
            <div
              key={i}
              className="grid justify-start items-center w-[360px] h-[171px] bg-white rounded-[20px] px-5 py-6"
            >
              <div className="w-[43px] h-10 p-2.5 flex-col justify-start items-start gap-2.5 inline-flex bg-[#C8E5FB]">
                <OrderIcon />
              </div>
              <div className="grid gap-2">
                <h3 className="text-black text-[22px] font-semibold">
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

      <div className="w-full bg-white rounded-[20.37px] px-7 py-8 my-14">
        <table className="w-full ">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Projects Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Track</th>
            </tr>

            {projectData?.map((item, i) => (
              <tr key={i}>
                <td className="py-7">
                  <div className="text-zinc-700 text-xl font-normal flex justify-start items-center gap-3">
                    #{item?.orderId}
                  </div>
                </td>
                <td className="py-7 w-[350px]">
                  <div className="text-zinc-700 text-xl font-normal flex justify-start items-center gap-3">
                    {/* <div className="w-10">
                      <Image
                        src={item?.image}
                        alt="image"
                        width={400}
                        height={400}
                        className={'h-10 object-cover'}
                      />
                    </div> */}
                    {item?.name}
                  </div>
                </td>
                <td className="py-7 text-center">
                  <div
                    className={`mx-auto w-[117px] h-[34px] bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 ${
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
                <td className="py-7 text-center">{item?.progress}</td>
                <td className="py-7 text-center">
                  <button
                    className=" w-[100px] h-[34px] bg-blue-800 rounded-[10px] text-white text-center mx-auto"
                    onClick={() => {
                      router.push(`/dashboard/all-projects/${item?.orderId}`)
                      dispatch(setActiveMenu(2))
                    }}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Main
