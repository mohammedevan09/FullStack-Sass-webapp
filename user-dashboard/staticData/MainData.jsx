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
    link: '/dashboard/settings',
  },
  {
    title: 'Team',
    icon: <DropTeamIcon />,
    link: '/dashboard/settings/team',
  },
  {
    title: 'Billing',
    icon: <DropBillingIcon />,
    link: '/dashboard/settings/billing',
  },
  {
    title: 'Notification',
    icon: <DropNotificationIcon />,
    link: '/dashboard/settings/notifications',
  },
]

export const dropData2 = [
  { title: 'Mark as complete' },
  { title: 'Request Revision' },
]

export const dropData3 = [
  { title: 'Close The Project' },
  { title: 'Renew The Plan' },
]

export const dropData4 = [
  { title: 'Cancel Subscription' },
  { title: 'Renew The Plan' },
]

export const filterByTypeData = [
  {
    title: 'Projects',
  },
  {
    title: 'Subscription',
  },
  {
    title: 'Hourly Plan',
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

export const someIconImages = [
  <Image src={'/iconImages/pending.png'} height={200} width={200} alt="icon" />,
  <Image
    src={'/iconImages/running.png'}
    height={200}
    width={200}
    alt="icon"
    className="mx-auto"
  />,
  <Image
    src={'/iconImages/complete.png'}
    height={200}
    width={200}
    alt="icon"
    className="mx-auto w-[33px]"
  />,
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

export const subscriptionData = [
  {
    orderId: '1030',
    name: 'abcd.com web maintenance',
    lastWebsiteUpdate: '02/12/2023',
    subscriptionRenew: '02/12/2023',
  },
  {
    orderId: '1030',
    name: 'abcd.com web maintenance',
    lastWebsiteUpdate: '02/12/2023',
    subscriptionRenew: '02/12/2023',
  },
  {
    orderId: '1030',
    name: 'abcd.com web maintenance',
    lastWebsiteUpdate: '02/12/2023',
    subscriptionRenew: '02/12/2023',
  },
  {
    orderId: '1030',
    name: 'abcd.com web maintenance',
    lastWebsiteUpdate: '02/12/2023',
    subscriptionRenew: '02/12/2023',
  },
  {
    orderId: '1030',
    name: 'abcd.com web maintenance',
    lastWebsiteUpdate: '02/12/2023',
    subscriptionRenew: '02/12/2023',
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
