import { projectData } from '@/staticData/MainData'
import MainAllTicketsPage from './MainAllTicketsPage'

const page = ({ searchParams }) => {
  return <MainAllTicketsPage projects={projectData} />
}

export default page
