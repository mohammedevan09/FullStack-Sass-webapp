import { projectData } from '@/staticData/MainData'
import MainAllProjects from './MainAllProjects'

const page = () => {
  return (
    <>
      <MainAllProjects projects={projectData} />
    </>
  )
}

export default page
