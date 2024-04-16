'use client'

import GetACustomProposalModal from '@/components/modals/serviceModals/GetACustomProposalModal'
import ThanksSubModal from '@/components/modals/serviceModals/ThanksSubModal'
import { useState } from 'react'
import PricingCard from '../PricingCard'
import { useForm } from 'react-hook-form'
import CustomFormModal from '@/components/modals/serviceModals/CustomFormModal'
import { useSelector } from 'react-redux'
import { createOrderApi } from '@/api/orderApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import CustomProposals from '../CustomProposals'
import CheckoutModal from '@/components/modals/serviceModals/CheckoutModal'
import { setRenewalDate } from '@/utils/SetRenewalDate'
import { createOrderChat } from '@/api/orderChatApi'

const MainServicePricingPage = ({ service, link }) => {
  const router = useRouter()

  const [openModalCustom, setOpenModalCustom] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)
  const [checkoutModal, setCheckOutModal] = useState(false)

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
      subscriptionRenew: setRenewalDate(),
      subscriptionType: 'Monthly',
    },

    mode: 'onChange',
  })

  const handleModal = (item) => {
    setValue('pricingId', item?._id)
    setValue('totalAmount', item?.amount)
    setOpenModal(true)
  }

  const handleCheckOutButton = async (data) => {
    if (isValid) {
      try {
        const orderData = await createOrderApi(
          { ...data, formId: service?.form?._id },
          link
        )
        await createOrderChat({
          participants: [userInfo?._id, service?.creatorId],
          orderId: orderData?._id,
          messages: [],
        })
        toast.success('Your service order has been received!')
        router.push(`/dashboard/all-projects?userId=${userInfo?._id}`)
      } catch (error) {
        toast.error('Checkout order failed!')
      }
    }
  }

  // console.log(service)

  return (
    <div className="grid items-center bg-white px-11 pt-12 rounded-[15px] mb-20 2xl:w-[1111px] w-full 2xl:max-w-full max-w-[950px]">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-8">
        {service?.pricing?.map((item, i) => {
          return (
            <PricingCard
              item={item}
              key={i}
              handleModal={handleModal}
              isSubscription={service?.__t === 'SubscriptionService'}
            />
          )
        })}
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
  )
}

export default MainServicePricingPage
