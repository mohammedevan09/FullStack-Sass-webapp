import MainMeetingPage from './MainMeetingPage'

const page = () => {
  const meetings = [
    {
      name: 'Meetings for website of ddevs.com',
      participant: 'You & Shadin',
      time: '10AM EST',
    },
    {
      name: 'Meetings for website of ddevs.com',
      participant: 'You & Shadin',
      time: '10AM EST',
    },
    {
      name: 'Meetings for website of ddevs.com',
      participant: 'You & Shadin',
      time: '10AM EST',
    },
  ]
  return (
    <>
      <MainMeetingPage meetings={meetings} />
    </>
  )
}

export default page
