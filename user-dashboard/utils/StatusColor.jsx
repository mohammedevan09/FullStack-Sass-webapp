'use client'

export const makeCapitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const StatusColor = ({ status, className }) => {
  const defaultColor = 'bg-blue-600'

  const getColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-rose-600'
      case 'done':
        return 'bg-green-500'
      case 'canceled':
        return ' bg-rose-600 text-red-600'
      default:
        return defaultColor
    }
  }
  return (
    <div
      className={`lg:w-[137px] w-[120px] h-[34px] mx-auto bg-opacity-20 rounded-[20px] flex justify-center items-center lg:gap-2 gap-[6px] ${getColorClass(
        status
      )} ${className}`}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${getColorClass(status)}`} />
      {makeCapitalize(status)}
    </div>
  )
}

export default StatusColor
