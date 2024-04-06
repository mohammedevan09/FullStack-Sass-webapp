'use client'

import { BackButtonIcon } from '@/staticData/Icon'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import TakeAction from '../../../_components/TakeAction'
import OrderBasicInfo from '../../../_components/OrderBasicInfo'
import AdditionInfo from '../../../_components/AdditionInfo'
import ProjectTrackingBoard from '../../../_components/ProjectTrackingBoard'
import InboxAndMessaging from '../../../_components/InboxAndMessaging'

const MainNormalServiceById = ({ order }) => {
  const router = useRouter()

  console.log(order)

  return (
    <div className="sm:my-14 my-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => router.back()}
        className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
      >
        <BackButtonIcon /> Go Back
      </motion.button>
      <div className="sm:flex grid sm:justify-between xs:items-start items-end gap-4 mb-6">
        <OrderBasicInfo order={order} />
        <TakeAction />
      </div>
      <AdditionInfo order={order} />

      <h1 className="text-2xl font-semibold pb-5 pt-10">
        Project Traction Board
      </h1>
      <ProjectTrackingBoard order={order} />
      <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
      <InboxAndMessaging order={order} />
    </div>
  )
}

export default MainNormalServiceById
