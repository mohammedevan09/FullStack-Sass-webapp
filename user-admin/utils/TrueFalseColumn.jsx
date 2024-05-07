const TrueFalseColumn = ({ value, className }) => {
  return (
    <div
      className={`px-3 py-1 ${
        !value ? 'bg-rose-600' : 'bg-blue-600'
      } rounded-full bg-opacity-70 text-white font-semibold ${className}`}
    >
      {value ? 'TRUE' : 'FALSE'}
    </div>
  )
}
export const IsBlockedColumn = ({ value, className }) => {
  return (
    <div
      className={`px-3 py-1 ${
        !value ? 'bg-blue-600' : 'bg-rose-600'
      } rounded-full bg-opacity-70 text-white font-semibold ${className}`}
    >
      {value ? 'YES' : 'NO'}
    </div>
  )
}

export default TrueFalseColumn
