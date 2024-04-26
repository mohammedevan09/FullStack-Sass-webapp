import { EditIcon, RemoveIcon } from '@/staticData/Icon'

const TeamTable = ({ members, setOpenModal, setRemoveModal }) => {
  return (
    <>
      <div className="lg:w-full w-screen px-7 overflow-x-scroll bg-white rounded-md py-5">
        {members?.length === 0 ? (
          <h2 className="sm:text-xl text-lg pt-6 text-gray-500 text-center">
            No team members created
          </h2>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Member Name</th>
                <th className="text-center">Position</th>
                <th className="text-center">Access</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="lg:text-base text-sm font-medium text-zinc-600">
              {members?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="lg:py-5 py-4 w-[120px]">
                      <div className="w-[120px]">
                        #{item?._id?.slice(0, 8)}..
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 sm:w-[250px] w-[200px] pl-1">
                      <div className="flex justify-start items-center gap-3 sm:w-[250px] w-[200px]">
                        {item?.name}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 text-center">
                      <div
                        className={`w-[170px] py-1 text-white rounded-[20px] mx-auto gap-2 bg-blue-600 font-medium tracking-wider`}
                      >
                        {item?.position}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 text-center">
                      <div className="sm:w-[250px] w-[200px] mx-auto">
                        {item?.access}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="w-[90px] mx-auto flex gap-4 justify-center">
                        <button
                          className={`disabled:opacity-50`}
                          onClick={(e) => {
                            e.preventDefault()
                            setOpenModal(true)
                          }}
                        >
                          <EditIcon color={'#2525ff'} />
                        </button>
                        <button
                          className={`disabled:opacity-50`}
                          onClick={(e) => {
                            e.preventDefault()
                            setRemoveModal(true)
                          }}
                        >
                          <RemoveIcon color={'#ff2a2a'} />
                        </button>
                      </div>
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

export default TeamTable
