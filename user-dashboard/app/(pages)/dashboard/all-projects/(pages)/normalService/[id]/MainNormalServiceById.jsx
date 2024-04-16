'use client'

import TakeAction from '../../../_components/TakeAction'
import OrderBasicInfo from '../../../_components/OrderBasicInfo'
import AdditionInfo from '../../../_components/AdditionInfo'
import ProjectTrackingBoard from '../../../_components/ProjectTrackingBoard'
import InboxAndMessaging from '../../../_components/InboxAndMessaging'
import BackButton from '@/components/others/BackButton'

const MainNormalServiceById = ({ order, service, orderChat }) => {
  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <BackButton />
      <div className="sm:flex grid sm:justify-between xs:items-start items-end gap-4 mb-6">
        <OrderBasicInfo order={order} service={service} />
        <TakeAction />
      </div>
      <AdditionInfo order={order} />

      <h1 className="text-2xl font-semibold pb-5 pt-10">
        Project Traction Board
      </h1>
      <ProjectTrackingBoard order={order} />
      <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
      <InboxAndMessaging order={order} orderChat={orderChat} />
    </div>
  )
}

export default MainNormalServiceById
