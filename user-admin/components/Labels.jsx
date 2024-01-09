const Labels = ({ htmlFor, name, optional, textSize, className = '' }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${
        textSize || 'text-base'
      } font-semibold tracking-tight mb-1 ${className}`}
    >
      {name}{' '}
      {optional && (
        <span className="text-gray-500 text-xs italic">(Optional)</span>
      )}
    </label>
  )
}

export default Labels
