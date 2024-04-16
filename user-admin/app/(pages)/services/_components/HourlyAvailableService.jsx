'use client'

import { CheckSignIcon, RemoveIcon } from '@/staticData/Icon'
import { useEffect, useState } from 'react'

const HourlyAvailableService = ({ serviceData, setServiceData, setValue }) => {
  const [availableService, setAvailableService] = useState(
    serviceData?.availableService || []
  )

  const handleAddAvailableService = (e) => {
    e.preventDefault()
    const inputService = e.target.elements.service.value.trim()
    if (inputService) {
      setAvailableService([...availableService, inputService])
      e.target.elements.service.value = ''
    }
  }

  const handleRemoveAvailableService = (e, index) => {
    e.preventDefault()
    const updatedService = [...availableService]
    updatedService.splice(index, 1)
    setAvailableService(updatedService)
  }

  useEffect(() => {
    setValue('availableService', availableService, { shouldDirty: true })
    setServiceData({
      ...serviceData,
      availableService,
    })
  }, [availableService, setValue, setServiceData])

  return (
    <>
      {serviceData?.availableService?.map((item, i) => (
        <div className="flex justify-between items-center" key={i}>
          <div className="flex gap-2 text-slate-900 sm:text-base text-[15px] font-semibold">
            <CheckSignIcon />
            <div>{item}</div>
          </div>
          <button
            onClick={(e) => handleRemoveAvailableService(e, i)}
            className="text-red-600"
          >
            <RemoveIcon />
          </button>
        </div>
      ))}
      <form
        onSubmit={handleAddAvailableService}
        className="flex h-[34px] svg-shadow rounded-sm overflow-hidden"
      >
        <input
          type="text"
          name="service"
          placeholder={`Add available service`}
          className="w-full px-3 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium rounded-sm px-4 py-1"
        >
          Add
        </button>
      </form>
    </>
  )
}

export default HourlyAvailableService
