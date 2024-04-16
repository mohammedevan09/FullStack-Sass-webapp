import {
  RemainHoursIcon,
  SpentHoursIcon,
  TotalHoursIcon,
} from '@/staticData/Icon'

const HourlyInfo = ({ order }) => {
  const hourlyInfo = [
    {
      title: 'Total Hours',
      value: order?.totalHours,
      icon: <TotalHoursIcon />,
      className: 'bg-rose-300',
    },
    {
      title: 'Spent Hours',
      value: order?.spentHours,
      icon: <SpentHoursIcon />,
      className: 'bg-blue-300',
    },
    {
      title: 'Remain Hours',
      value: order?.remainHours,
      icon: <RemainHoursIcon />,
      className: 'bg-green-300',
    },
  ]

  return (
    <div className="md:flex grid md:justify-between items-center 2xl:gap-4 gap-2 mb-8">
      {hourlyInfo?.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 w-full bg-opacity-20 py-4 px-5 rounded-lg text-gray-700 ${item?.className}`}
        >
          <div>{item?.icon}</div>
          <div className="grid gap-1">
            <h3 className="text-xl font-bold">{item?.title}</h3>
            <h2 className="text-base font-semibold">{item?.value} hours</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HourlyInfo
