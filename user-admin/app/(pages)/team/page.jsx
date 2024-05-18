import { getAllTeamByCreatorIdApi } from '@/api/teamApi'
import MainTeam from './MainTeam'

const page = async ({ searchParams }) => {
  const { users, totalDocsCount } = await getAllTeamByCreatorIdApi(
    searchParams,
    searchParams?.userId
  )

  return (
    <div className="w-full sm:my-20 xs:my-10 my-3">
      <MainTeam teamData={users} totalDocsCount={totalDocsCount} />
    </div>
  )
}

export default page
