import { getUserSettingById } from '@/api/userSettingApi'
import MainEmailNotification from './MainEmailNotification'

const page = async ({ searchParams }) => {
  const userSetting = await getUserSettingById(searchParams?.userId)

  const modifiedEmailNotifications = emailNotifications.map((item) => {
    return {
      ...item,
      isOn: userSetting?.emailNotification[item.type],
    }
  })

  return (
    <div className="w-full grid items-center sm:my-20 xs:my-10 my-5 sm:px-4 xs:px-3 px-1">
      <h2 className="text-black text-lg font-medium leading-relaxed sm:mb-7 mb-4">
        Email Notifications
      </h2>

      <MainEmailNotification
        emailNotifications={modifiedEmailNotifications}
        userSetting={userSetting}
      />
    </div>
  )
}

export const emailNotifications = [
  // {
  //   title: 'Send me  new message notification to my email',
  //   type: 'message',
  // },
  {
    title: 'Send me project status update notification to my email',
    type: 'project',
  },
  {
    title: 'Send me ticket status update notification to my email',
    type: 'ticket',
  },
  {
    title: 'Send me new proposals & invoice notification to my email',
    type: 'invoiceAndProposal',
  },
  {
    title: 'Send me subscription notification to my email',
    type: 'subscription',
  },
  {
    title: 'Send me meeting notification to my email',
    type: 'meeting',
  },
]

export default page
