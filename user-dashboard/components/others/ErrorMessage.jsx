const ErrorMessage = ({ errors }) => {
  return (
    <>
      {errors?.message && (
        <p className="text-red-500 text-sm font-bold">{errors?.message}</p>
      )}
    </>
  )
}

export const ErrorMessageTwo = ({ errors }) => {
  return (
    <>
      {errors?.message && (
        <p className="text-red-500 text-sm font-bold mt-1">{errors?.message}</p>
      )}
    </>
  )
}

export default ErrorMessage
