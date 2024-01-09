'use client'

import AddNewServiceCategory from '@/components/modals/serviceModal/AddNewServiceCategory'
import EditNewServiceCategory from '@/components/modals/serviceModal/EditNewServiceCategory'
import { AddProjectIcon, AllProjectsIcon } from '@/staticData/Icon'
import { useState } from 'react'

const MainServiceCategoryPage = ({ service }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  return (
    <>
      <button
        className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 px-3 flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow  text-lg font-medium bg-blue-800 text-white"
        onClick={() => setOpenModal(true)}
      >
        <AddProjectIcon color={'white'} /> Add New categories
      </button>
      <h2 className="text-zinc-700 text-2xl flex justify-start items-center sm:gap-3 gap-2 mt-12">
        <AllProjectsIcon color={'black'} /> Services Categories
      </h2>
      <div className="lg:w-full w-screen bg-white rounded-[20.37px] px-7 py-8 sm:mb-14 mb-10 sm:mt-8 mt-6 overflow-x-scroll">
        <table className="w-full">
          <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
            <th>ID</th>
            <th>Categories Name</th>
            <th className="text-center">Action</th>
          </tr>
          <tbody>
            {service?.map((item, i) => (
              <tr key={i}>
                <td className="lg:py-6 py-3">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 w-[90px]">
                    #{item?.id}
                  </div>
                </td>
                <td className="lg:py-6 py-3 2xl:w-[350px] w-[300px]">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-full w-[270px]">
                    {item?.category}
                  </div>
                </td>

                <td className="lg:py-6 py-3 text-center">
                  <button
                    className="w-[100px] h-[34px] btn-hover rounded-[10px] text-center"
                    onClick={() => setOpenEditModal(true)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openModal && (
        <AddNewServiceCategory
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {openEditModal && (
        <EditNewServiceCategory
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
        />
      )}
    </>
  )
}

export default MainServiceCategoryPage
