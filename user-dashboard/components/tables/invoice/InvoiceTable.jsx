import StatusColor from '@/utils/StatusColor'
import Link from 'next/link'

const InvoiceTable = ({ invoices }) => {
  return (
    <>
      <div className="lg:w-full w-screen px-7 overflow-x-scroll">
        {invoices?.results?.length === 0 ? (
          <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
            No invoices to show
          </h2>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Projects Name</th>
                <th className="text-center">Payment Status</th>
                <th className="text-center">Project Status</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-zinc-700">
              {invoices?.results?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="lg:py-5 py-4 w-[120px] pr-3">
                      <div className="w-[120px] truncate">#{item?._id}</div>
                    </td>
                    <td className="lg:py-5 py-4 2xl:w-[300px] w-[250px] pl-1 pr-2">
                      <div className="flex items-center 2xl:w-[300px] w-[250px] gap-2 truncate">
                        <div className="truncate">{item.title}</div>
                        {item?.type === 'Proposal' && (
                          <div className="  bg-blue-600 px-2 py-[3px] text-xs text-white font-medium rounded-full tracking-wider">
                            {item?.type}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 text-center px-3 lg:w-[127px] w-[96px]">
                      <StatusColor status={item?.payment_status} />
                    </td>
                    <td className="lg:py-5 py-4 text-center px-3 lg:w-[127px] w-[96px]">
                      <StatusColor status={item?.status} />
                    </td>
                    <td className="lg:py-5 py-4 px-2">
                      <div className="flex justify-center items-center gap-3 min-w-[70px] truncate">
                        ${item?.totalAmount}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 lg:px-0 px-3 text-center w-[130px]">
                      <Link
                        href={`/dashboard/invoice/${item?._id}?type=${item?.type}`}
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
    </>
  )
}

export default InvoiceTable
