'use client'

import { Input2 } from '@/components/others/Input'
import { LabelsTwo } from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import YesNoRadioInput from '@/components/others/YesNoRadioInput'
import CheckoutModal from './CheckoutModal'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessageTwo } from '@/components/others/ErrorMessage'

const MaintenancePlansModal = ({ setOpenModal, openModal, pricingData }) => {
  const [checkOutModal, setCheckOutModal] = useState(false)
  const [finalForm, setFinalForm] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      type: pricingData?.type,
      websiteFeatures: [
        { title: 'Website Login URL', value: '' },
        { title: 'User Name/Email', value: '' },
        { title: 'Password', value: '' },
      ],
      additionalOptions: [{ title: 'Virtual Meeting', value: false }],
      amount: pricingData?.price,
    },
    mode: 'onChange',
  })

  const handleRadioChange = (name, value) => {
    setValue(name, value === 'true')
  }

  const handleCheckOutButton = async (formData) => {
    if (isValid) {
      setFinalForm(formData)
      setCheckOutModal(true)
    }
  }
  return (
    <>
      <WrappingModal modalOpen={openModal}>
        <div className="grid bg-white pt-16 pb-4 sm:px-24 xs:px-6 px-2 rounded-[20px] overflow-x-hidden">
          <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
            Provide project details & questionnaire
          </h3>
          <div className="w-full h-[0px] border border-neutral-400 mt-5 mb-14"></div>
          <div className="grid gap-5">
            <div className="grid">
              <LabelsTwo htmlFor={'project-title'} name={'Project Title'} />
              <Input2
                id={'project-title'}
                placeholder={'Ex: Andrea’s personal web development'}
                type={'text'}
                validationRules={{
                  ...register('title', {
                    required: {
                      value: true,
                      message: 'Title is required',
                    },
                  }),
                }}
              />
              <ErrorMessageTwo errors={errors?.title} />
            </div>
            <div className="grid">
              <LabelsTwo
                htmlFor={'website-login-url'}
                name={'Website login URL'}
              />
              <Input2
                id={'website-login-url'}
                placeholder={'Example: https://yoursite.com/wp-admin.php?'}
                type={'text'}
                validationRules={{
                  ...register('websiteFeatures[0].value', {
                    required: {
                      value: true,
                      message: 'Website Login URL is required',
                    },
                  }),
                }}
              />
              <ErrorMessageTwo
                errors={
                  errors?.websiteFeatures && errors.websiteFeatures[0]?.value
                }
              />
            </div>
            <div className="grid">
              <LabelsTwo htmlFor={'User-name/email'} name={'User name/Email'} />
              <Input2
                id={'User-name/email'}
                placeholder={'Example: https://yoursite.com/wp-admin.php?'}
                type={'email'}
                validationRules={{
                  ...register('websiteFeatures[1].value', {
                    required: {
                      value: true,
                      message: 'User Name or EmaiL is required',
                    },
                  }),
                }}
              />
              <ErrorMessageTwo
                errors={
                  errors?.websiteFeatures && errors.websiteFeatures[1]?.value
                }
              />
            </div>
            <div className="grid">
              <LabelsTwo htmlFor={'password-project'} name={'Password'} />
              <Input2
                id={'password-project'}
                placeholder={'Example: https://yoursite.com/wp-admin.php?'}
                type={'password'}
                validationRules={{
                  ...register('websiteFeatures[2].value', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }),
                }}
              />
              <ErrorMessageTwo
                errors={
                  errors?.websiteFeatures && errors.websiteFeatures[2]?.value
                }
              />
            </div>

            <div className="grid gap-9 mt-10">
              <YesNoRadioInput
                name={
                  'Do you need a virtual meeting for this project discussion?'
                }
                radioFor={'virtual-meeting'}
                yesClick={() =>
                  handleRadioChange('additionalOptions[0].value', 'true')
                }
                noClick={() =>
                  handleRadioChange('additionalOptions[0].value', 'false')
                }
              />
            </div>
          </div>
          <div className="grid items-center gap-3 mt-14">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
              onClick={handleSubmit(handleCheckOutButton)}
            >
              Checkout Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              className="w-full p-4 text-blue-800 rounded-[9px] bg-white text-lg font-semibold leading-7"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </WrappingModal>

      {checkOutModal && (
        <CheckoutModal
          formData={finalForm}
          paymentLink={'maintenancePlans/create-checkout-session'}
          setOpenModal={setCheckOutModal}
          openModal={checkOutModal}
        />
      )}
    </>
  )
}

export default MaintenancePlansModal
