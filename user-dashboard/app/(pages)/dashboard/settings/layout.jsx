'use client'

import { useSelector } from 'react-redux'
import MainSettingsLayoutPage from './MainSettingsLayoutPage'

const layout = ({ children }) => {
  const { userInfo } = useSelector((state) => state?.user)

  const allSettings = [
    {
      title: 'Profile',
      link: '/dashboard/settings',
      comp: '',
    },
    ...(!userInfo?.creatorId
      ? [
          {
            title: 'Notifications',
            link: '/dashboard/settings/notifications',
            comp: '',
          },
        ]
      : []),
  ]

  return (
    <div className="grid w-full">
      <div className="text-gray-800 text-2xl font-bold md:mt-20 sm:mt-10 mt-6 mb-8 sm:px-4 xs:px-3 px-1">
        Settings
      </div>

      <MainSettingsLayoutPage allSettings={allSettings} />
      <div className="sm:px-4 xs:px-3 px-1">{children}</div>
    </div>
  )
}

export default layout
