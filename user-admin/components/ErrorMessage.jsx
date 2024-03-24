const ErrorMessage = ({ errors }) => {
  return (
    <>
      {errors?.message && (
        <p className="text-red-500 text-sm font-bold">{errors?.message}</p>
      )}
    </>
  )
}

export default ErrorMessage
