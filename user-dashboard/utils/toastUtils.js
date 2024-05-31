'use client'

import toast from 'react-hot-toast'

export const showTeamMemberErrorToast = () => {
  toast.error(`Sorry Team members can't do this~`, {
    style: {
      padding: '6px 16px',
      fontWeight: '500',
      fontSize: '15px',
    },
    iconTheme: {
      primary: '#137cff',
    },
  })
}
