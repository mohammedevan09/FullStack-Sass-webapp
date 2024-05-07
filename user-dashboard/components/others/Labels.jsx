const Labels = ({ htmlFor, name, cn }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-black text-base font-medium cursor-pointer ${
        cn ? cn : '-mb-4'
      }`}
    >
      {name}
    </label>
  )
}

export const LabelsTwo = ({
  htmlFor,
  name,
  optional,
  textSize,
  className = '',
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${
        textSize || 'text-base'
      } font-semibold tracking-tight mb-1 cursor-pointer ${className}`}
    >
      {name}
      {optional && (
        <span className="text-gray-500 text-xs italic"> (Optional)</span>
      )}
    </label>
  )
}

export default Labels
