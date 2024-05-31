'use client'

import BackButton from '@/components/others/BackButton'
import TakeAction from '@/components/others/TakeAction'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ServiceHeading from '../ServiceHeading'
import PricingCard from '../PricingCard'
import PricingServiceModal from '@/components/modals/serviceModal/PricingServiceModal'
import { useForm } from 'react-hook-form'
import ServiceBasicInfo from '../ServiceBasicInfo'
import StatusAction from '../StatusAction'
import EditNewService from '@/components/modals/serviceModal/EditNewService'
import DeleteService from '@/components/modals/serviceModal/DeleteService'
import ReactSelect from '@/components/others/ReactSelect'
import { updateService, uploadSvgIcon } from '@/api/serviceApi'
import { useSelector } from 'react-redux'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'

const MainServicePage = ({ service, forms }) => {
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

  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: service,
    mode: 'onChange',
  })

  const handleClick = async (data) => {
    if (userInfo?.creatorId) {
      return showTeamMemberErrorToast()
    }

    let updatedImage
    if (image) {
      toast.loading('Processing, please wait!', { duration: 1000 })
      const formData = new FormData()
      image.forEach((img) => {
        formData.append(`images`, img)
      })
      updatedImage = await uploadSvgIcon(data?._id, formData, userInfo?.token)
    }
    const updatedData = await updateService(
      pathname,
      { ...data, ...(updatedImage?.icon && { icon: updatedImage.icon }) },
      userInfo?.token
    )
    setServiceData(updatedData)
    setImage(null)
    toast.success('Your service updated successfully!')
    reset(updatedData)
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
          <div className="md:flex grid justify-between items-end mb-5 gap-2">
            <ServiceHeading service={serviceData} />
            <button
              className="text-base py-1 px-4 rounded font-semibold hover:scale-105 transition text-white bg-blue-600 min-w-[180px] w-[181px]"
              onClick={() => {
                if (userInfo?.creatorId) {
                  return showTeamMemberErrorToast()
                }
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
          disabled={(!isDirty && !image) || isSubmitting}
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

export default MainServicePage
