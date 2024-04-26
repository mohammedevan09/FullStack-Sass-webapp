import MainTeam from './MainTeam'

const page = () => {
  const teamData = [
    {
      _id: '65833330bfa5499db0298649',
      name: 'Anik Mahmud',
      position: 'Lead developer',
      access: 'Projects, Invoice',
    },
  ]
  return (
    <div className="w-full sm:my-20 xs:my-10 my-3">
      <MainTeam teamData={teamData} />
    </div>
  )
}

export default page
