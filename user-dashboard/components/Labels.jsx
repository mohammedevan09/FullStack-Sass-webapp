const Labels = ({ htmlFor, name, cn }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-black text-base font-medium ${cn ? cn : '-mb-4'}`}
    >
      {name}
    </label>
  )
}

export const LabelsTwo = ({ htmlFor, name }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-base font-semibold tracking-tight mb-2`}
    >
      {name}
    </label>
  )
}

export default Labels
