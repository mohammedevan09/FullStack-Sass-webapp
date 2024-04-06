'use client'

export const makeCapitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const StatusColor = ({ status, className }) => {
  return (
    <div
      className={`lg:w-[127px] w-[96px] h-[34px] mx-auto bg-opacity-20 rounded-[20px] flex justify-center items-center lg:gap-2 gap-[6px] ${
        status?.toLocaleLowerCase() === 'pending'
          ? 'bg-rose-600'
          : status?.toLocaleLowerCase() === 'done'
          ? 'bg-green-500'
          : status?.toLocaleLowerCase() === 'canceled'
          ? 'bg-rose-600 text-[red!important]'
          : 'bg-blue-600'
      } ${className}`}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full ${
          status?.toLocaleLowerCase() === 'pending'
            ? 'bg-rose-600'
            : status?.toLocaleLowerCase() === 'done'
            ? 'bg-green-500'
            : status?.toLocaleLowerCase() === 'canceled'
            ? 'bg-rose-600'
            : 'bg-blue-600'
        }`}
      />
      {makeCapitalize(status)}
    </div>
  )
}

export default StatusColor
