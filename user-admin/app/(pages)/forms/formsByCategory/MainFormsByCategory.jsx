'use client'

import { FormsByCategoryIdIcon } from '@/staticData/Icon'

const MainFormsByCategory = ({ forms }) => {
  console.log(forms)
  return (
    <div className="lg:w-full w-screen px-7 pt-8 overflow-x-scroll">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold">{forms?.name}</h1>
          <h2 className="text-base font-semibold text-gray-500">
            {forms?.description}
          </h2>
        </div>{' '}
        <button
          className="w-[130px] h-[34px] btn-hover rounded-[5px] text-center"
          onClick={() => {}}
        >
          Create New +
        </button>
      </div>
      <div className="bg-zinc-400 w-full h-[1px] mt-3 mb-6" />
      <div className="grid items-center gap-3">
        {forms?.forms?.map((item, i) => (
          <div key={item?._id} className="flex justify-between items-center">
            <div className="flex gap-2">
              <FormsByCategoryIdIcon />
              <div className="grid">
                <p className="font-semibold text-base">{item?.name}</p>
                <p className="text-sm text-gray-400">{item?.description}</p>
              </div>
            </div>
            <button
              className="w-[120px] h-[34px] text-blue-500 hover:text-blue-700 hover:text-lg transition-1 font-medium rounded-[5px] text-center"
              onClick={() => router.push(`/forms/formsByCategory/${item?._id}`)}
            >
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainFormsByCategory
