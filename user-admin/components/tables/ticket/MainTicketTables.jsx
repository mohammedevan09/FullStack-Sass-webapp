import StatusColor from '@/utils/StatusColor'
import Link from 'next/link'

const MainTicketTables = ({ tickets, userInfo }) => {
  return (
    <>
      <div className="lg:w-full w-screen px-7 overflow-x-scroll">
        {tickets?.length === 0 ? (
          <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
            No Tickets to show
          </h2>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Title</th>
                <th>Project ID</th>
                <th className="text-center">Status</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody className="lg:text-base text-sm font-medium text-zinc-600">
              {tickets?.map((item, i) => (
                <tr key={i}>
                  <td className="lg:py-5 py-4 w-[120px]">
                    <div className="w-[120px]">#{item?._id?.slice(0, 8)}..</div>
                  </td>
                  <td className="lg:py-5 py-4 2xl:w-[300px] w-[250px] pl-1">
                    <div className="flex justify-start items-center gap-3 2xl:w-full w-[250px]">
                      {item?.title?.length >= 60 ? (
                        <>{item?.title?.substring(0, 60)}...</>
                      ) : (
                        <>{item?.title}</>
                      )}
                    </div>
                  </td>
                  <td className="lg:py-5 py-4 px-2">
                    <div className="min-w-[110px]">
                      #{item?.orderId?.slice(0, 14)}..
                    </div>
                  </td>
                  <td className="lg:py-5 py-4 text-center px-3 lg:w-[127px] w-[96px]">
                    <StatusColor status={item?.status} />
                  </td>

                  <td className="lg:py-5 py-4 lg:px-0 px-3 text-center w-[130px]">
                    <Link
                      href={`/tickets/${item?._id}?userId=${userInfo?._id}`}
                      className="btn-hover rounded-[5px] text-center px-5 py-1"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default MainTicketTables
