import { projectData } from '@/staticData/MainData'
import MainSubscriptionPage from './MainSubscriptionPage'

const page = () => {
  const projectData = [
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
  return <MainSubscriptionPage projects={projectData} />
}

export default page
