import MainTeam from './MainTeam'

const page = () => {
  const teamData = [
    {
      name: 'Anik Mahmud',
      position: 'Lead developer',
      access: 'Projects, Invoice',
    },
  ]
  return (
    <div className="w-full grid items-center sm:my-20 xs:my-10 my-3 sm:px-4 xs:px-3 px-1">
      {' '}
      <MainTeam teamData={teamData} />
    </div>
  )
}

export default page
