const ServiceHeading = ({ service }) => {
  return (
    <>
      <div className="grid items-center mb-5">
        <h1 className="text-gray-900 sm:text-3xl text-2xl font-semibold leading-[60px] sm:pt-2 pb-1">
          {service?.heading}
        </h1>
        <p className="text-gray-500 text-lg font-normal leading-[30px]">
          {service?.subheading}
        </p>
      </div>
    </>
  )
}

export default ServiceHeading
