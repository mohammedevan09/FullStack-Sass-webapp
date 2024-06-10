import { EditIcon, RemoveIcon, ViewIcon } from '@/staticData/Icon'
import Image from 'next/image'
import dummyProfile from '@/public/images/dummyProfile.png'
import { makeCapitalize } from '@/utils/StatusColor'

const TeamTable = ({
  members,
  setOpenModal,
  setRemoveModal,
  setEditableMember,
}) => {
  return (
    <>
      <div className="lg:w-full w-screen px-7 overflow-x-scroll bg-white rounded-md py-5">
        {members?.length === 0 ? (
          <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
            No team members created
          </h2>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Name</th>
                <th className="text-center">Image</th>
                <th className="text-center">Position</th>
                <th className="text-center">Access</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-zinc-700">
              {members?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="lg:py-5 py-4 w-[120px] pr-4">
                      <div className="w-[120px] truncate">#{item?._id}</div>
                    </td>
                    <td className="lg:py-5 py-4 w-[120px] pl-1 pr-2">
                      <div className="w-[120px] truncate">{item.fullName}</div>
                    </td>
                    <td className="py-3 w-[60px] px-8">
                      <div className="w-[50px]">
                        <Image
                          src={item?.profileImage || dummyProfile}
                          height={100}
                          width={100}
                          alt={item?.fullName}
                          className="object-cover h-[50px] rounded-full bg-[#7136ff36]"
                        />
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <div
                        className={`w-[170px] py-1 text-white rounded-[20px] mx-auto gap-2 bg-blue-600 font-medium tracking-wider`}
                      >
                        {item?.position || 'None'}
                      </div>
                    </td>
                    <td className="py-3 text-center font-semibold text-xs min-w-[210px]">
                      <div className="w-[210px] mx-auto px-4 truncate">
                        {Object.entries(item.access)
                          .filter(([_, { access }]) => access)
                          .map(([key]) => makeCapitalize(key))
                          .join(' | ')}
                        {!Object.values(item.access).some(
                          ({ access }) => access
                        ) && 'None'}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="w-[90px] mx-auto flex gap-4 justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setEditableMember(item)
                            setOpenModal(true)
                          }}
                        >
                          <EditIcon color={'#2525ff'} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setEditableMember(item)
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
