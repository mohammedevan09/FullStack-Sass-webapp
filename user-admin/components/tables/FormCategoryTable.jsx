'use client'

import { EditIcon, RemoveIcon } from '@/staticData/Icon'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'
import { useRouter } from 'next/navigation'

const FormCategoryTable = ({
  formCategoryData,
  title,
  setEditModel,
  setRemoveModal,
  setItem,
  link,
  userInfo,
}) => {
  const router = useRouter()
  return (
    <div className="lg:w-full w-screen px-7 pt-6 overflow-x-scroll">
      <h1 className="sm:text-xl text-lg font-semibold inline border-b-2 border-zinc-600 pb-2">
        {title}
      </h1>
      {formCategoryData?.length === 0 ? (
        <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
          {title} is empty!
        </h2>
      ) : (
        <table className="w-full mt-6">
          <thead>
            <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Name</th>
              <th className="text-center">Creator ID</th>
              <th className="text-center">Action</th>
              <th className="text-center">Manage</th>
            </tr>
          </thead>
          <tbody className="lg:text-base text-sm font-medium text-zinc-800">
            {formCategoryData?.map((item, i) => (
              <tr key={i}>
                <td className="lg:py-5 py-4 w-[120px] pr-3">
                  <div className="w-[120px] truncate">#{item?._id}</div>
                </td>
                <td className="lg:py-5 py-4 pl-1">
                  <div className="truncate">{item?.name}</div>
                </td>
                <td className="lg:py-5 py-4 px-2 w-[110px]">
                  <div className="flex justify-start items-center gap-3 min-w-[110px]">
                    #{item?.creatorId}
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="w-[120px] mx-auto flex gap-4 justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        if (userInfo?.creatorId) {
                          return showTeamMemberErrorToast()
                        } else {
                          setItem(item)
                          setEditModel(true)
                        }
                      }}
                    >
                      <EditIcon color={'#2525ff'} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        if (userInfo?.creatorId) {
                          return showTeamMemberErrorToast()
                        } else {
                          setItem(item)
                          setRemoveModal(true)
                        }
                      }}
                    >
                      <RemoveIcon color={'#ff2a2a'} />
                    </button>
                  </div>
                </td>
                <td className="lg:py-5 py-4 text-center">
                  <button
                    className="w-[120px] h-[34px] btn-hover rounded-[5px] text-center"
                    onClick={() => router.push(`${link}${item?._id}`)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FormCategoryTable
