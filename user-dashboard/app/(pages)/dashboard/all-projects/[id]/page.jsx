import Image from 'next/image'
import MainViewAllProjectsPage from './MainViewAllProjectsPage'

const page = ({ params }) => {
  return (
    <>
      <MainViewAllProjectsPage params={params} />
    </>
  )
}

export default page
