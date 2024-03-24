'use client'

import BackButton from '@/components/others/BackButton'
import TakeAction from '@/components/others/TakeAction'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ServiceHeading from '../../_components/ServiceHeading'
import PricingCard from '../../_components/PricingCard'
import PricingServiceModal from '@/components/modals/serviceModal/PricingServiceModal'
import { useForm } from 'react-hook-form'
import ServiceBasicInfo from '../../_components/ServiceBasicInfo'
import StatusAction from '../../_components/StatusAction'
import EditNewService from '@/components/modals/serviceModal/EditNewService'
import DeleteService from '@/components/modals/serviceModal/DeleteService'

const MainNormalService = ({ service }) => {
  const [serviceData, setServiceData] = useState(service)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [pricingModal, setPricingModal] = useState(false)
  const [image, setImage] = useState(null)
  const [pricingLength, setPricingLength] = useState(
    serviceData?.pricing?.length
  )

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      _id: service?._id,
      creatorId: service?.creatorId,
      name: service?.name,
      heading: service?.heading,
      subheading: service?.subheading,
      isActive: service?.isActive,
      icon: service?.icon,
      pricing:
        service?.pricing.map((item) => ({
          amount: item.amount || 0,
          name: item.name || '',
          subName: item.subName || '',
          availableService: item.availableService || [],
          unavailableService: item.unavailableService || [],
        })) || [],
    },

    mode: 'onChange',
  })

  const handleClick = (data) => {
    console.log(data, isValid, isDirty)
  }

  return (
    <>
      <div className="mb-10 sm:px-4 xs:px-3 px-1">
        <div className="sm:mt-14 mt-8 mb-8">
          <BackButton title={'Go Back'} link={'/services'} />
          <div className="sm:flex grid justify-between xs:items-start items-end">
            <ServiceBasicInfo service={serviceData} image={image} />
            <div className="flex  gap-2 justify-start items-start sm:mt-0 mt-4">
              <StatusAction
                service={serviceData}
                setValue={setValue}
                handleSubmit={handleSubmit}
                setServiceData={setServiceData}
              />
              <TakeAction
                setEditModal={setEditModal}
                setDeleteModal={setDeleteModal}
              />
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <ServiceHeading service={serviceData} />
            <button
              className="text-base py-1 px-4 rounded font-semibold hover:scale-105 transition text-white bg-blue-600"
              onClick={() => {
                setPricingModal(true)
                setPricingLength(serviceData?.pricing?.length || 0)
              }}
            >
              + Add New Pricing
            </button>
          </div>
          {serviceData?.pricing?.length === 0 ? (
            <h2 className="font-semibold text-gray-400 text-center text-xl bg-white py-8 px-10 rounded-lg">
              No pricing added yet
            </h2>
          ) : (
            <div className="grid md:grid-cols-3 grid-cols-1 lg:justify-center items-center gap-8 bg-white py-8 px-10 rounded-lg">
              {serviceData?.pricing?.map((item, i) => {
                return (
                  <PricingCard
                    key={i}
                    index={i}
                    item={item}
                    editPricingModal={setPricingModal}
                    setPricingLength={setPricingLength}
                  />
                )
              })}
            </div>
          )}
        </div>
        <button
          className="text-lg py-3 px-4 rounded font-semibold transition hover:bg-white hover:text-blue-600 hover:border-blue-600 border text-white bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit(handleClick)}
          disabled={!isDirty && !image}
        >
          Save setting
        </button>
      </div>
      {pricingModal && (
        <PricingServiceModal
          setPricingModal={setPricingModal}
          pricingModal={pricingModal}
          handleSubmit={handleSubmit}
          register={register}
          pricingLength={pricingLength}
          setValue={setValue}
          serviceData={serviceData}
          setServiceData={setServiceData}
          isValid={isValid}
        />
      )}
      {editModal && (
        <EditNewService
          openModal={editModal}
          setOpenModal={setEditModal}
          register={register}
          serviceData={serviceData}
          setServiceData={setServiceData}
          image={image}
          setImage={setImage}
          handleSubmit={handleSubmit}
          errors={errors}
          reset={reset}
          isDirty={isDirty}
          isValid={isValid}
        />
      )}
      {deleteModal && (
        <DeleteService
          serviceData={serviceData}
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
        />
      )}
    </>
  )
}

export default MainNormalService
