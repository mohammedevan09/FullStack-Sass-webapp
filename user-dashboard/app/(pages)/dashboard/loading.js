const loading = () => {
  return (
    <div className="grid sm:grid-cols-3 items-center overflow-hidden">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          role="status"
          className="sm:max-w-sm p-4 rounded animate-pulse md:p-6"
          key={i}
        >
          <div className="flex items-center sm:justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-300"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
        </div>
      ))}
    </div>
  )
}

export default loading
