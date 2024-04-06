import StatusColor from '@/utils/StatusColor'
import Link from 'next/link'

const HourlyServiceTables = ({ hourlyData }) => {
  return (
    <>
      <div className="lg:w-full w-screen px-7 overflow-x-scroll">
        {hourlyData?.length === 0 ? (
          <h2 className="sm:text-xl text-lg pt-6 text-gray-500 text-center">
            No projects to show
          </h2>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Projects Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Total Hours</th>
                <th className="text-center">Spent Hours</th>
                <th className="text-center">Hours left</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody className="lg:text-base text-sm font-medium text-zinc-600">
              {hourlyData?.map((item, i) => (
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
                  <td className="lg:py-5 py-4 text-center px-3">
                    <StatusColor status={item?.status} />
                  </td>
                  <td className="lg:py-5 py-4 text-center">
                    <div
                      className={`w-[110px] h-[34px] mx-2 bg-opacity-20 rounded-[20px] bg-green-500 py-1 px-3 text-base`}
                    >
                      {item?.totalHours} hr
                    </div>
                  </td>
                  <td className="lg:py-5 py-4 text-center">
                    <div
                      className={`w-[110px] h-[34px] mx-2 bg-opacity-20 rounded-[20px] bg-sky-500 py-1 px-3 text-base`}
                    >
                      {item?.spentHours} hr
                    </div>
                  </td>
                  <td className="lg:py-5 py-4 text-center">
                    <div
                      className={`w-[110px] h-[34px] mx-2 bg-opacity-20 rounded-[20px] bg-rose-600 py-1 px-3 text-base`}
                    >
                      {item?.remainHours} hr
                    </div>
                  </td>

                  <td className="lg:py-5 py-4 lg:px-0 px-3 text-center w-[130px]">
                    <Link
                      href={`/dashboard/all-projects/hourlyService/${item?._id}`}
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

export default HourlyServiceTables
