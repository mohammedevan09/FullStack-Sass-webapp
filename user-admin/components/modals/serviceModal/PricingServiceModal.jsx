'use client'

import { Input2 } from '@/components/Input'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import Labels from '@/components/Labels'
import { useEffect, useState } from 'react'
import PricingServices from '@/app/(pages)/services/_components/PricingServices'

const PricingServiceModal = ({
  pricingModal,
  setPricingModal,
  handleSubmit,
  register,
  pricingLength,
  setValue,
  serviceData,
  setServiceData,
  isValid,
}) => {
  const [availableService, setAvailableService] = useState(
    serviceData?.pricing[pricingLength]?.availableService || []
  )
  const [unavailableService, setUnavailableService] = useState(
    serviceData?.pricing[pricingLength]?.unavailableService || []
  )

  // console.log(availableService, unavailableService)

  const handleAddAvailableService = (e) => {
    e.preventDefault()
    const inputService = e.target.elements.service.value.trim()
    if (inputService) {
      setAvailableService([...availableService, inputService])
      e.target.elements.service.value = ''
    }
  }

  const handleDeleteAvailableService = (index) => {
    const updatedService = [...availableService]
    updatedService.splice(index, 1)
    setAvailableService(updatedService)
  }

  const handleAddUnavailableService = (e) => {
    e.preventDefault()
    const inputService = e.target.elements.service.value.trim()
    if (inputService) {
      setUnavailableService([...unavailableService, inputService])
      e.target.elements.service.value = ''
    }
  }

  const handleDeleteUnavailableService = (index) => {
    const updatedService = [...unavailableService]
    updatedService.splice(index, 1)
    setUnavailableService(updatedService)
  }

  const handleAddPricing = (data) => {
    setServiceData(data)
    setPricingModal(false)
  }

  const handleDelete = (data) => {
    const updatedPricing = [...data?.pricing]
    updatedPricing.splice(pricingLength, 1)
    setValue('pricing', updatedPricing, { shouldDirty: true })
    setServiceData({ ...data, pricing: updatedPricing })
    setPricingModal(false)
  }

  useEffect(() => {
    setValue(`pricing[${pricingLength}].availableService`, availableService)
    setValue(`pricing[${pricingLength}].unavailableService`, unavailableService)
  }, [availableService, unavailableService, pricingLength, setValue])

  return (
    <WrappingModal modalOpen={pricingModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Add new pricing
        </h3>
        <div className="grid gap-5">
          <div className="grid">
            <Labels name={'Price (In dollars)'} />
            <Input2
              placeholder={'Ex - $50 / $100 / $500'}
              type={'number'}
              className={'text-lg px-3'}
              validationRules={{
                ...register(`pricing[${pricingLength}].amount`, {
                  required: true,
                  valueAsNumber: true,
                }),
              }}
            />
          </div>
          <div className="grid">
            <Labels name={'Pricing type'} />
            <Input2
              placeholder={'Ex - Basic/Standard/Premium'}
              type={'text'}
              validationRules={{
                ...register(`pricing[${pricingLength}].name`, {
                  required: true,
                }),
              }}
            />
          </div>
          <div className="grid">
            <Labels name={'Pricing Sub Name'} />
            <Input2
              placeholder={'Ex - Transparent ROI'}
              type={'text'}
              validationRules={{
                ...register(`pricing[${pricingLength}].subName`, {
                  required: true,
                }),
              }}
            />
          </div>
          <PricingServices
            pricingServices={availableService}
            handleAddPricingService={handleAddAvailableService}
            handleDeletePricingService={handleDeleteAvailableService}
            available={true}
          />
          <PricingServices
            pricingServices={unavailableService}
            handleAddPricingService={handleAddUnavailableService}
            handleDeletePricingService={handleDeleteUnavailableService}
            available={false}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full px-4 py-2 rounded-[5px] text-blue-800 text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed border-blue-600 border-2"
            onClick={() => {
              if (pricingLength === serviceData?.pricing?.length) {
                setValue('pricing', serviceData?.pricing)
              }
              setPricingModal(false)
            }}
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full px-4 py-2 bg-blue-800 rounded-[5px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid}
            onClick={handleSubmit(handleAddPricing)}
          >
            Save
          </motion.button>
        </div>
        {pricingLength !== serviceData?.pricing?.length && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full px-4 py-2 mt-4 bg-rose-500 rounded-[5px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleDelete)}
          >
            Delete Pricing
          </motion.button>
        )}
      </div>
    </WrappingModal>
  )
}

export default PricingServiceModal
