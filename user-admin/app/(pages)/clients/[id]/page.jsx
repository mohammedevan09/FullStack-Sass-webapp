import { getAllTeamByCreatorIdApi } from '@/api/teamApi'
import MainTeam from './MainTeam'
import { getAllUsersApi } from '@/api/userApi'

const page = async ({ searchParams, params }) => {
  const data = await getAllTeamByCreatorIdApi({ limit: 100 }, params?.id)
  const user = await getAllUsersApi({
    search: params?.id,
  })

  return (
    <div className="w-full sm:my-20 xs:my-10 my-3">
      <MainTeam teamData={data} user={user?.data?.[0] || {}} />
    </div>
  )
}

export default page
