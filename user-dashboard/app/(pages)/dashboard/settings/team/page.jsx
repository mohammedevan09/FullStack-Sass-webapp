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
    <div className="w-full grid justify-center items-center sm:my-20 xs:my-10 my-5">
      {' '}
      <MainTeam teamData={teamData} />
    </div>
  )
}

export default page
