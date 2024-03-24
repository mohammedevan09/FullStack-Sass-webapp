import { useRouter } from 'next/navigation'
import React from 'react'

const FormCategoryTable = ({ formCategoryData, title }) => {
  const router = useRouter()
  return (
    <div className="lg:w-full w-screen px-7 pt-8 overflow-x-scroll">
      <caption className="sm:text-xl text-lg font-semibold inline border-b-2 border-zinc-600 pb-2">
        {title}
      </caption>
      {formCategoryData?.length === 0 ? (
        <h2 className="sm:text-xl text-lg pt-6 text-gray-500 text-center">
          {title} is empty!
        </h2>
      ) : (
        <table className="w-full sm:mt-10 mt-8">
          <thead>
            <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Name</th>
              <th>Creator ID</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="lg:text-base text-sm font-medium text-zinc-800">
            {formCategoryData?.map((item, i) => (
              <tr key={i}>
                <td className="lg:py-7 py-4">
                  <div className="flex justify-start items-center gap-3 w-[90px]">
                    #{item?._id?.slice(0, 8)}..
                  </div>
                </td>
                <td className="lg:py-7 py-4 pl-1">
                  <div className="flex justify-start items-center gap-3 md:min-w-full min-w-[250px]">
                    {item?.name?.length >= 60 ? (
                      <>{item?.name?.substring(0, 60)}...</>
                    ) : (
                      <>{item?.name}</>
                    )}
                  </div>
                </td>

                <td className="lg:py-7 py-4 px-2 w-[110px]">
                  <div className="flex justify-start items-center gap-3 min-w-[110px]">
                    #{item?.creatorId}
                  </div>
                </td>
                <td className="lg:py-7 py-4 text-center">
                  <button
                    className="w-[120px] h-[34px] btn-hover rounded-[5px] text-center"
                    onClick={() =>
                      router.push(`/forms/formsByCategory?id=${item?._id}`)
                    }
                  >
                    Manage
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
