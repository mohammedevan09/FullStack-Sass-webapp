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

export const takeActionData = [
  { title: 'Edit details' },
  { title: 'Delete service' },
]

export const fakeMessageData = [
  {
    name: 'Henry Kevil',
    message: 'What about the project?',
    image: '/images/verify.png',
  },
  {
    name: 'Jack Johnson',
    message: 'I have working and it is working fine.',
    image: '/images/demo.jpg',
  },
  {
    name: 'Henry Kevil',
    message: 'OH that is a good news!',
    image: '/images/verify.png',
  },
  {
    name: 'Jack Johnson',
    message: 'We will give you the update later.',
    image: '/images/demo.jpg',
  },
]
