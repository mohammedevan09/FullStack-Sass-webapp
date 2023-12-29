import {
  hourlyData,
  projectData,
  subscriptionData,
} from '@/staticData/MainData'
import MainAllProjects from './MainAllProjects'

const page = () => {
  return (
    <>
      <MainAllProjects
        projects={projectData}
        subscriptions={subscriptionData}
        hourlyData={hourlyData}
      />
    </>
  )
}

export default page
