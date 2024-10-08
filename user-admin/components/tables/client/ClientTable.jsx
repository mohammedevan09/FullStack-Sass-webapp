import TrueFalseColumn, { IsBlockedColumn } from '@/utils/TrueFalseColumn'
import { formatDateTwo } from '@/utils/formateDateAndTime'
import Image from 'next/image'
import dummyProfile from '@/public/images/dummyProfile.png'
import Link from 'next/link'

const ClientTable = ({ data }) => {
  return (
    <div className="lg:w-full w-screen px-7 py-8 overflow-x-scroll">
      {data?.length === 0 ? (
        <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
          No projects to show
        </h2>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="lg:text-xl text-lg font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-center">Verified</th>
              <th className="text-center">Blocked</th>
              <th className="text-center">Created AT</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold text-zinc-700">
            {data?.map((item, i) => {
              return (
                <tr key={i}>
                  <td className="lg:py-5 py-4 w-[90px] pr-4">
                    <div className="w-[90px] truncate">#{item?._id}</div>
                  </td>
                  <td className="lg:py-5 py-4 w-[160px] pr-3">
                    <div className="w-[160px] truncate">{item?.fullName}</div>
                  </td>
                  <td className="lg:py-5 py-4 w-[150px] pr-7">{item?.email}</td>
                  <td className="lg:py-5 py-4">
                    <div className="min-w-[110px] italic font-semibold">
                      {item?.number}
                    </div>
                  </td>
                  <td className="lg:py-5 py-4 px-6">
                    <TrueFalseColumn value={item?.email_verified} />
                  </td>
                  <td className="lg:py-5 py-4 px-6">
                    <IsBlockedColumn value={item?.isBlocked} />
                  </td>
                  <td className="w-[140px] pl-4 pr-6">
                    <div className="w-[140px] text-center font-semibold text-xs">
                      {formatDateTwo(item?.createdAt)}
                    </div>
                  </td>
                  <td className="lg:py-5 py-4 lg:px-0 px-6 text-center w-[130px]">
                    <Link
                      href={`/clients/${item?._id}`}
                      className="btn-hover rounded-[5px] text-center px-5 py-1"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ClientTable
