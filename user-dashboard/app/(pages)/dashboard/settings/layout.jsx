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
      <div className="text-gray-800 text-2xl font-bold mt-20 mb-8 ml-[92px]">
        Settings
      </div>
      <div className="w-[1180px] h-[0px] border border-stone-300"></div>
      <MainSettingsLayoutPage allSettings={allSettings} />
      <div className="w-[1180px] h-[0px] border border-stone-300"></div>
      {children}
    </div>
  )
}

export default layout
