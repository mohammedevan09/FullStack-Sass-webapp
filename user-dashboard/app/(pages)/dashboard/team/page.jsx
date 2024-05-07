import { getAllTeamByCreatorIdApi } from '@/api/teamApi'
import MainTeam from './MainTeam'

const page = async ({ searchParams }) => {
  const data = await getAllTeamByCreatorIdApi(
    { limit: 100 },
    searchParams?.userId
  )

  return (
    <div className="w-full sm:my-20 xs:my-10 my-3 md:mx-4 xs:mx-3 mx-1">
      <MainTeam teamData={data} />
    </div>
  )
}

export default page
