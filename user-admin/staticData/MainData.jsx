import {
  DropBillingIcon,
  DropNotificationIcon,
  DropProfileIcon,
  DropTeamIcon,
} from './Icon'

export const dropdownData = [
  {
    title: 'Profile',
    icon: <DropProfileIcon />,
    link: '/settings',
  },
  {
    title: 'Team',
    icon: <DropTeamIcon />,
    link: '/settings/team',
  },
  {
    title: 'Billing',
    icon: <DropBillingIcon />,
    link: '/settings/billing',
  },
  {
    title: 'Notification',
    icon: <DropNotificationIcon />,
    link: '/settings/notifications',
  },
]

export const notificationDropDownData = [
  {
    title: 'D-marketing subscription',
    description: 'Your subscription needs to upgrade.',
  },
  {
    title: 'D-marketing subscription',
    description: 'Your subscription needs to upgrade.',
  },
]

export const projectData = [
  {
    orderId: '1234',
    image: '/images/demo.jpg',
    name: 'Wordpress theme customization',
    status: 'Pending',
    progress: 'Content Writing',
  },
  {
    orderId: '1234',
    image: '/images/demo.jpg',
    name: 'Wordpress theme customization',
    status: 'Done',
    progress: 'Development',
  },
  {
    orderId: '1234',
    image: '/images/demo.jpg',
    name: 'Wordpress theme customization',
    status: 'Running',
    progress: 'Ux Research',
  },
  {
    orderId: '1234',
    image: '/images/demo.jpg',
    name: 'Wordpress theme customization',
    status: 'Done',
    progress: 'Development',
  },
  {
    orderId: '1234',
    image: '/images/demo.jpg',
    name: 'Wordpress theme customization',
    status: 'Done',
    progress: 'Development',
  },
]
