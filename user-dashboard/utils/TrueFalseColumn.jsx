const TrueFalseColumn = ({ value, className }) => {
  return (
    <div
      className={`px-3 py-1 ${
        !value ? 'bg-rose-400' : 'bg-blue-400'
      } rounded-full bg-opacity-70 text-white font-semibold ${className} text-center`}
    >
      {value ? 'TRUE' : 'FALSE'}
    </div>
  )
}
export const IsBlockedColumn = ({ value, className }) => {
  return (
    <div
      className={`px-3 py-1 ${
        !value ? 'bg-blue-400' : 'bg-rose-400'
      } rounded-full bg-opacity-70 text-white font-semibold ${className} text-center`}
    >
      {value ? 'YES' : 'NO'}
    </div>
  )
}

export default TrueFalseColumn
