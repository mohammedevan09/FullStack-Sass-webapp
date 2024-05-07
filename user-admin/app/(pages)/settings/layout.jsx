'use client'

import { useSelector } from 'react-redux'
import MainSettingsLayoutPage from './MainSettingsLayoutPage'

const layout = ({ children }) => {
  const { userInfo } = useSelector((state) => state?.user)

  const allSettings = [
    {
      title: 'Profile',
      link: '/settings',
      comp: '',
    },
    ...(!userInfo?.creatorId
      ? [
          {
            title: 'Notifications',
            link: '/settings/notifications',
            comp: '',
          },
        ]
      : []),
  ]

  return (
    <div className="grid w-full">
      <div className="text-gray-800 text-2xl font-bold md:mt-20 sm:mt-10 mt-6 mb-8">
        Settings
      </div>

      <MainSettingsLayoutPage allSettings={allSettings} />
      {children}
    </div>
  )
}

export default layout
