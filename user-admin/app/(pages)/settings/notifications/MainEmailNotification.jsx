'use client'

import { updateSettingByIdApi } from '@/api/userSettingApi'
import { redirect } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const MainEmailNotification = ({ emailNotifications, userSetting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: userSetting,
    mode: 'onChange',
  })

  const handleSave = async (data) => {
    await toast.promise(updateSettingByIdApi(data, userSetting?._id), {
      loading: 'Updating settings',
      success: <b>Settings updated successfully</b>,
      error: <b>Settings updated failed!</b>,
    })
    reset(data)
  }

  const { userInfo } = useSelector((state) => state?.user)

  useLayoutEffect(() => {
    if (userInfo?.access) {
      redirect('/')
    }
  }, [userInfo])

  return (
    <div className="grid justify-start items-center sm:p-10 py-7 px-3 bg-white gap-8 rounded-lg">
      {emailNotifications?.map((item, i) => (
        <div key={i} className="flex gap-3 font-medium">
          <div className="h-4 relative top-[2px]">
            <div className="inline-flex items-center bg-gray-300 rounded-full">
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input
                  {...register(`emailNotification.${item.type}`)}
                  defaultChecked={userSetting?.emailNotification[item.type]}
                  id={item?.title}
                  type="checkbox"
                  className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                />
                <label
                  htmlFor={item?.title}
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                >
                  <div
                    className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"
                  ></div>
                </label>
              </div>
            </div>
          </div>
          <div
            className="text-slate-900 text-sm"
            style={{
              wordBreak: 'break-word',
            }}
          >
            {item?.title}
          </div>
        </div>
      ))}
      <div className="w-full my-2">
        <button
          className="w-full px-10 py-2 bg-blue-800 hover:scale-105 text-white font-bold transition rounded-md disabled:opacity-50 disabled:cursor-pointer"
          disabled={!isDirty}
          onClick={handleSubmit(handleSave)}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default MainEmailNotification
