'use client'

import BackButton from '@/components/others/BackButton'
import TakeAction from '@/components/others/TakeAction'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ServiceHeading from '../ServiceHeading'
import { useForm } from 'react-hook-form'
import ServiceBasicInfo from '../ServiceBasicInfo'
import StatusAction from '../StatusAction'
import EditNewService from '@/components/modals/serviceModal/EditNewService'
import DeleteService from '@/components/modals/serviceModal/DeleteService'
import ReactSelect from '@/components/others/ReactSelect'
import { updateService, uploadSvgIcon } from '@/api/serviceApi'
import HourlyPricing from '../HourlyPricing'
import EditHourlyPricingService from '@/components/modals/serviceModal/EditHourlyPricingService'
import HourlyAvailableService from '../HourlyAvailableService.jsx'

const MainHourlyServicePage = ({ service, forms }) => {
  const [serviceData, setServiceData] = useState(service)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [pricingModal, setPricingModal] = useState(false)
  const [image, setImage] = useState(null)
  const [pricingLength, setPricingLength] = useState(
    serviceData?.pricing?.length
  )

  const router = useRouter()
  const pathname = usePathname()

  // console.log(serviceData)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: service,
    mode: 'onChange',
  })

  const handleClick = async (data) => {
    // console.log(data, isValid, isDirty)
    if (image) {
      toast.loading('Processing, please wait!', { duration: 1000 })
      const formData = new FormData()
      image.forEach((img) => {
        formData.append(`images`, img)
      })
      const updatedImage = await uploadSvgIcon(data?._id, formData)
      setValue('icon', updatedImage?.icon)
      setImage(null)
      setServiceData({ ...serviceData, icon: updatedImage?.icon })
      toast.success('Your service icon is updated!')
      reset()
    }
    if (isValid && isDirty) {
      const updatedData = await updateService(pathname, data)
      setServiceData(updatedData)
      setImage(null)
      toast.success('Your service updated successfully!')
      reset()
    }
  }

  return (
    <>
      <div className="mb-10 sm:px-4 xs:px-3 px-1">
        <div className="sm:mt-14 mt-8 mb-8">
          <BackButton title={'Go Back'} link={'/services'} />
          <div className="md:flex grid md:justify-between xs:items-start items-end gap-2">
            <div className="md:w-[50%] w-full">
              <ServiceBasicInfo service={serviceData} image={image} />
              <ReactSelect
                setValue={setValue}
                data={forms}
                placeholder={serviceData?.form?._id}
              />
            </div>
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
          <button
            className="text-base py-1 px-4 rounded font-semibold hover:scale-105 transition text-white bg-blue-600 min-w-[180px] w-[181px] mb-5"
            onClick={() => {
              setPricingModal(true)
              setPricingLength(serviceData?.pricing?.length || 0)
            }}
          >
            + Add New Pricing
          </button>

          <div className="grid md:grid-cols-2 grid-cols-1 lg:justify-center items-start gap-8 bg-white py-8 px-10 rounded-lg">
            <div className="grid sm:gap-5 xs:gap-4 gap-3 text-slate-900 text-base font-semibold leading-normal">
              <ServiceHeading service={serviceData} />
              <HourlyAvailableService
                setValue={setValue}
                serviceData={serviceData}
                setServiceData={setServiceData}
              />
            </div>
            <div className="grid gap-4">
              {serviceData?.pricing?.map((item, i) => (
                <HourlyPricing
                  key={i}
                  index={i}
                  item={item}
                  editPricingModal={setPricingModal}
                  setPricingLength={setPricingLength}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          className="text-lg py-3 px-4 rounded font-semibold transition hover:bg-white hover:text-blue-600 hover:border-blue-600 border text-white bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit(handleClick)}
          disabled={(!isDirty && !image) || isSubmitting}
        >
          Save setting
        </button>
      </div>
      {pricingModal && (
        <EditHourlyPricingService
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
          router={router}
          serviceData={serviceData}
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
          pathname={pathname}
        />
      )}
    </>
  )
}

export default MainHourlyServicePage
