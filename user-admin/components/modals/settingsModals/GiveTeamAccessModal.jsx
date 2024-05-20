'use client'

import { motion } from 'framer-motion'
import { useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getAllTeamByCreatorIdApi } from '@/api/teamApi'
import { useSelector } from 'react-redux'
import WrappingModal from '../WrappingModal'
import Image from 'next/image'
import dummyProfile from '@/public/images/dummyProfile.png'
import ReactSelectTwo from '@/components/others/ReactSelectTwo'

const GiveTeamAccessModal = ({
  openModal,
  setOpenModal,
  accessType,
  api,
  order,
}) => {
  const [data, setData] = useState([])
  const [value, setValue] = useState('')

  const { userInfo } = useSelector((state) => state?.user)

  const handleClick = async () => {
    if (value) {
      try {
        await api(value)
        toast.success(`Access Granted to ${value?.value?.name}!`)
        setOpenModal(false)
      } catch (error) {
        toast.error(`Cannot give access to  ${value?.value?.name}`)
        setOpenModal(false)
      }
    }
  }

  const modifiedData = data
    .filter(
      (item) => !item?.access?.[accessType]?.accessOf?.includes(order?._id)
    )
    .map((item) => ({
      label: (
        <div className="flex gap-2 text-xs items-center">
          <div className="w-[32px]">
            <Image
              src={item?.profileImage || dummyProfile}
              alt={item?.fullName}
              width={32}
              height={32}
              className="h-[32px] object-cover rounded-full"
            />
          </div>
          <div className="grid">
            <div className="text-sm">{item?.fullName}</div>
            <div className="text-gray-500 italic">{item?.email}</div>
          </div>
        </div>
      ),
      value: { _id: item._id, name: item?.fullName },
    }))

  const onChange = (selectedVal) => {
    setValue(selectedVal)
  }

  useLayoutEffect(() => {
    const fetchMembers = async () => {
      try {
        const { users } = await getAllTeamByCreatorIdApi(
          { limit: 50 },
          userInfo?._id
        )
        setData(users || [])
      } catch (error) {
        return []
      }
    }
    fetchMembers()
  }, [userInfo])

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-8 pb-6 px-8 rounded-[20px] sm:w-[500px] w-[360px] relative">
        <h3 className="sm:text-2xl text-base font-semibold tracking-tight mx-auto mb-8">
          Select Team member you want to give access to.
        </h3>
        <ReactSelectTwo
          data={modifiedData}
          onChange={onChange}
          val={value}
          placeholder={'Ex - John Doe'}
        />

        <div className="flex items-center gap-3 mt-8 mb-3">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full py-2 text-blue-800 rounded-[9px] text-lg font-semibold leading-7"
            onClick={() => {
              setOpenModal(false)
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-2 px-2 bg-blue-600 rounded-[9px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleClick()}
            disabled={!value}
          >
            Give Access
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default GiveTeamAccessModal
