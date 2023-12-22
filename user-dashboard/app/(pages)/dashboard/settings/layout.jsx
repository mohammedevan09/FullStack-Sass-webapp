'use client'

import MainSettingsLayoutPage from './MainSettingsLayoutPage'

const layout = ({ children }) => {
  const allSettings = [
    {
      title: 'Profile',
      link: '/dashboard/settings',
      comp: '',
    },
    {
      title: 'Team',
      link: '/dashboard/settings/team',
      comp: '',
    },
    {
      title: 'Billing',
      link: '/dashboard/settings/billing',
      comp: '',
    },
    {
      title: 'Notifications',
      link: '/dashboard/settings/notifications',
      comp: '',
    },
  ]

  return (
    <div className="grid w-full">
      <div className="text-gray-800 text-2xl font-bold md:mt-20 sm:mt-10 mt-6 mb-8 sm:px-4 xs:px-3 px-1">
        Settings
      </div>
      <div className="h-[0px] border border-stone-300"></div>
      <MainSettingsLayoutPage allSettings={allSettings} />
      <div className="h-[0px] border border-stone-300"></div>
      {children}
    </div>
  )
}

export default layout
