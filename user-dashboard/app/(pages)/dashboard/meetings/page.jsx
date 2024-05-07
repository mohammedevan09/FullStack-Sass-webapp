import MainMeetingPage from './MainMeetingPage'
import MeetingCalendly from './MeetingCalendly'

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
      {/* <MainMeetingPage meetings={meetings} /> */}
      <MeetingCalendly />
    </>
  )
}

export default page
