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
              <tr className="lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Title</th>
                <th className="px-2">Project ID</th>
                <th className="text-center">Status</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-zinc-700">
              {tickets?.map((item, i) => (
                <tr key={i}>
                  <td className="lg:py-5 py-4 w-[120px] pr-4">
                    <div className="w-[120px] truncate">#{item?._id}</div>
                  </td>
                  <td className="lg:py-5 py-4 w-[250px] pl-1 pr-2">
                    <div className="2xl:w-full w-[250px] truncate">
                      {item.title}
                    </div>
                  </td>
                  <td className="lg:py-5 py-4 px-2">
                    <div className="truncate">#{item?.orderId}</div>
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
