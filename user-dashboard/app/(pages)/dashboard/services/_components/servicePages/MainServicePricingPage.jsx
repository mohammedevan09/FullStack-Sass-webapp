'use client'

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
import { createChat } from '@/api/chatApi'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'

const MainServicePricingPage = ({ service, link }) => {
  const router = useRouter()

  const [openModal, setOpenModal] = useState(false)

  const [checkoutModal, setCheckOutModal] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      userId: userInfo?._id,
      serviceId: service?._id,
      subscriptionType: 'monthly',
    },

    mode: 'onChange',
  })

  const handleModal = (item) => {
    if (userInfo?.creatorId) {
      showTeamMemberErrorToast()
    } else {
      setValue('pricingId', item?._id)
      setValue('totalAmount', item?.amount)
      setOpenModal(true)
    }
  }

  const handleCheckOutButton = async (data) => {
    if (isValid) {
      try {
        toast.loading('Processing, please wait!', { duration: 600 })
        const orderData = await createOrderApi(
          { ...data, formId: service?.form?._id },
          link,
          userInfo?.token
        )
        await createChat(
          'order',
          {
            participants: [
              {
                participantType: 'User',
                participantId: userInfo?._id,
              },
              {
                participantType: 'User',
                participantId: service?.creatorId,
              },
            ],
            orderId: orderData?._id,
            messages: [],
          },
          userInfo?.token
        )
        toast.success('Your service order has been received!')
        if (orderData?.url) {
          router.push(orderData?.url)
        } else {
          router.push(`/dashboard/orders?userId=${userInfo?._id}`)
        }
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
      <CustomProposals />

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
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

export default MainServicePricingPage
