const ServiceHeading = ({ service }) => {
  return (
    <>
      <div className="grid items-center md:mb-0 mb-5">
        <h1 className="text-gray-900 sm:text-3xl text-2xl font-semibold">
          {service?.heading}
        </h1>
        <p className="text-gray-500 text-lg font-normal">
          {service?.subheading}
        </p>
      </div>
    </>
  )
}

export default ServiceHeading
