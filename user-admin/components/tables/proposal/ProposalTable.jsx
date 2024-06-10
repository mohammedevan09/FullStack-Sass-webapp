import StatusColor from '@/utils/StatusColor'
import TrueFalseColumn from '@/utils/TrueFalseColumn'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ProposalTables = ({ projects }) => {
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div className="lg:w-full w-screen px-7 overflow-x-scroll">
        {projects?.length === 0 ? (
          <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
            No projects to show
          </h2>
        ) : (
          <table
            className="w-full"
            style={{
              borderCollapse: 'separate',
              borderSpacing: '0px 10px',
            }}
          >
            <thead>
              <tr className="lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th className="px-3">ID</th>
                <th>Projects Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Accepted</th>
                <th className="text-center">Timeline</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-zinc-700">
              {projects?.map((item, i) => {
                return (
                  <tr
                    key={i}
                    className={`${
                      userInfo?._id !== item?.details?.lastProposalBy &&
                      item?.details?.isAccepted === false
                        ? 'bg-animation'
                        : ''
                    }`}
                  >
                    <td className="lg:py-5 py-4 w-[120px] px-3">
                      <div className="w-[120px] truncate">#{item?._id}</div>
                    </td>
                    <td className="lg:py-5 py-4 2xl:w-[300px] w-[250px] pl-1 pr-2">
                      <div className="2xl:w-full w-[250px] truncate">
                        {item.title}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 text-center px-3 lg:w-[127px] w-[96px]">
                      <StatusColor status={item?.status} />
                    </td>
                    <td className="lg:py-5 py-4 px-6">
                      <TrueFalseColumn value={item?.details?.isAccepted} />
                    </td>
                    <td className="lg:py-5 py-4 px-6 text-center font-bold">
                      <div className="w-20 mx-auto text-center">
                        {item?.timeline} Days
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 lg:px-0 px-3 text-center w-[130px]">
                      <Link
                        href={`/proposals/${item?._id}`}
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

export default ProposalTables
