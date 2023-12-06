import Image from 'next/image'
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
  },
  {
    title: 'Team',
    icon: <DropTeamIcon />,
  },
  {
    title: 'Billing',
    icon: <DropBillingIcon />,
  },
  {
    title: 'Notification',
    icon: <DropNotificationIcon />,
  },
]

export const dropData2 = [
  { title: 'Mark As Complete' },
  { title: 'Request Revision' },
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

export const statisticsData = [
  {
    title: 'Last Month Spent',
    value: '$20,000',
    image: (
      <Image
        alt="img"
        width={500}
        height={500}
        src={'/images/spent.png'}
        className="h-[63px]"
      />
    ),
  },
  {
    title: 'Completed Projects',
    value: '30',
    image: (
      <Image
        alt="img"
        width={500}
        height={500}
        src={'/images/complete.png'}
        className="h-[63px]"
      />
    ),
  },
  {
    title: 'Total Subscription',
    value: '12',
    image: (
      <Image
        alt="img"
        width={500}
        height={500}
        src={'/images/dollarTotal.png'}
        className="h-[63px]"
      />
    ),
  },
]

export const ordersData = [
  {
    title: 'Pending Project',
    value: '10 Orders',
  },
  {
    title: 'Running Project',
    value: '10 Orders',
  },
  {
    title: 'Complete Project',
    value: '10 Orders',
  },
]

export const ticketsData = [
  {
    title: 'Pending Ticket',
    value: '10',
  },
  {
    title: 'Running Ticket',
    value: '10',
  },
  {
    title: 'Complete Ticket',
    value: '10',
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

export const hourlyData = [
  {
    orderId: '1234',
    name: 'Wordpress theme customization',
    totalHours: '40 Hrs',
    spentHours: '40 Hrs',
    remainingHours: '40 Hrs',
  },
  {
    orderId: '1234',
    name: 'Wordpress theme customization',
    totalHours: '40 Hrs',
    spentHours: '40 Hrs',
    remainingHours: '40 Hrs',
  },
  {
    orderId: '1234',
    name: 'Wordpress theme customization',
    totalHours: '40 Hrs',
    spentHours: '40 Hrs',
    remainingHours: '40 Hrs',
  },
  {
    orderId: '1234',
    name: 'Wordpress theme customization',
    totalHours: '40 Hrs',
    spentHours: '40 Hrs',
    remainingHours: '40 Hrs',
  },
  {
    orderId: '1234',
    name: 'Wordpress theme customization',
    totalHours: '40 Hrs',
    spentHours: '40 Hrs',
    remainingHours: '40 Hrs',
  },
]
