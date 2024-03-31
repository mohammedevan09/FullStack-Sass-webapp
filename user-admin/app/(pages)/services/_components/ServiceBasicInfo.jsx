import Image from 'next/image'
import React from 'react'

const ServiceBasicInfo = ({ service, image }) => {
  return (
    <div>
      <h1 className="md:text-3xl sm:text-2xl text-xl font-semibold">
        {service?.name}{' '}
      </h1>
      <div className="bg-white py-3 px-4 rounded-lg svg-shadow mt-3">
        {image ? (
          <Image
            src={URL.createObjectURL(image[0])}
            alt="icon"
            width={60}
            height={60}
            className="mt-2"
          />
        ) : (
          <Image
            src={service?.icon}
            alt="icon"
            width={60}
            height={60}
            className="mt-2"
          />
        )}
        <h6 className="text-base font-normal py-4">
          <b>Service ID</b> - {service?._id}
        </h6>
        <h6 className="text-base font-normal pb-4">
          <b>Creator ID</b> - {service?.creatorId}
        </h6>
        <div className="flex justify-start items-center gap-3">
          <b>Status</b>
          <div
            className={`w-[86px] h-[30px] bg-opacity-20 rounded-[20px] text-sm flex justify-center font-medium items-center lg:gap-2 gap-[6px] ${
              service?.isActive
                ? 'bg-blue-600 text-blue-600'
                : 'bg-rose-600 text-rose-600'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                service?.isActive ? 'bg-blue-600' : 'bg-rose-600'
              }`}
            />
            {service?.isActive ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceBasicInfo
