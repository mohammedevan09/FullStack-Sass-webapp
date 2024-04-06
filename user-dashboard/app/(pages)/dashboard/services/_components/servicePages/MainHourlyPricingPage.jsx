'use client'

import { BackButtonIcon, CheckSignIcon } from '@/staticData/Icon'
import React, { useState } from 'react'
import HourlyPricing from '../HourlyPricing'
import CustomProposals from '../CustomProposals'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import CheckoutModal from '@/components/modals/marketplaceModal/CheckoutModal'
import CustomFormModal from '@/components/modals/marketplaceModal/CustomFormModal'
import GetACustomProposalModal from '@/components/modals/marketplaceModal/GetACustomProposalModal'
import ThanksSubModal from '@/components/modals/marketplaceModal/ThanksSubModal'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { setActiveMenu } from '@/store/reducers/activeReducer'
import { createOrderApi } from '@/api/orderApi'

const MainHourlyPricingPage = ({ service, link }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [openModalCustom, setOpenModalCustom] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)
  const [checkoutModal, setCheckOutModal] = useState(false)
  const [pricingData, setPricingData] = useState(service?.pricing[0])

  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      userId: userInfo?._id,
      serviceId: service?._id,
    },

    mode: 'onChange',
  })

  const handleModal = (item) => {
    setValue('pricingId', item?._id)
    setValue('totalAmount', item?.amount)
    setValue('totalHours', item?.hours)
    setPricingData(item)
  }

  const handleCheckOutButton = async (data) => {
    if (isValid) {
      try {
        await createOrderApi(data, link)
        toast.success('Your service order has been received!')
        router.push(`/dashboard/all-projects?userId=${userInfo?._id}`)
        dispatch(setActiveMenu(2))
      } catch (error) {
        toast.error('Checkout order failed!')
      }
    }
  }

  return (
    <>
      <Link
        href={'/dashboard/services'}
        className="flex justify-start items-center w-[200px] gap-1 sm:my-10 my-5 font-semibold text-xl -ml-1"
      >
        <BackButtonIcon /> See Other Plans
      </Link>

      <h5 className="text-blue-800 text-base font-semibold leading-normal mb-4">
        Pricing
      </h5>
      <div className="grid items-center bg-white xs:px-11 px-6 sm:pt-12 pt-6 rounded-[15px] mb-20 w-full">
        <div className="md:flex grid lg:justify-between items-start gap-8">
          <div className="grid items-center lg:w-1/2 w-full">
            <h1 className="text-slate-900 sm:text-4xl text-3xl font-bold">
              {service?.heading}
            </h1>
            <h6 className="text-gray-600 sm:text-lg text-base font-normal leading-[20px] sm:pt-3 pt-1 sm:pb-7 pb-5">
              {service?.subheading}
            </h6>
            <div className="grid sm:gap-5 xs:gap-4 gap-3 text-slate-900 text-base font-semibold leading-normal">
              {service?.availableService?.map((item, i) => (
                <div
                  className="flex gap-2 text-slate-900 sm:text-base text-[15px] font-semibold"
                  key={i}
                >
                  <CheckSignIcon />
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="grid gap-4">
              {service?.pricing?.map((item, i) => (
                <HourlyPricing
                  item={item}
                  index={i}
                  key={item?._id}
                  handleModal={handleModal}
                  pricingData={pricingData}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full sm:py-4 py-3 text-white text-base font-semibold bg-blue-800 sm:rounded-lg rounded-md my-5"
              onClick={() => setOpenModal(true)}
            >
              Book Now
            </motion.button>
          </div>
        </div>
        <CustomProposals setOpenModalCustom={setOpenModalCustom} />
        {openModalCustom && (
          <GetACustomProposalModal
            openModal={openModalCustom}
            setOpenModal={setOpenModalCustom}
            openSubModal={openSubModal}
            setOpenSubModal={setOpenSubModal}
          />
        )}
        {openSubModal && (
          <ThanksSubModal
            setOpenModal={setOpenModal}
            setOpenSubModal={setOpenSubModal}
            openModal={openSubModal}
          />
        )}
        {openModal && (
          <CustomFormModal
            register={register}
            service={service}
            setOpenModal={setOpenModal}
            openModal={openModal}
            errors={errors}
            isValid={isValid}
            setCheckOutModal={setCheckOutModal}
          />
        )}
        {checkoutModal && (
          <CheckoutModal
            openModal={checkoutModal}
            setOpenModal={setCheckOutModal}
            handleCheckOutButton={handleSubmit(handleCheckOutButton)}
            setValue={setValue}
          />
        )}
      </div>
    </>
  )
}

export default MainHourlyPricingPage