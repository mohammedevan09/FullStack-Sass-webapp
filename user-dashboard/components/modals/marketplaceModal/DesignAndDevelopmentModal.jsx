'use client'

import { Input2 } from '@/components/others/Input'
import { LabelsTwo } from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { useState } from 'react'
import CheckoutModal from './CheckoutModal'
import { useForm } from 'react-hook-form'
import { ErrorMessageTwo } from '@/components/others/ErrorMessage'
import YesNoRadioInput from '@/components/others/YesNoRadioInput'

const DesignAndDevelopmentModal = ({
  pricingData,
  openModal,
  setOpenModal,
}) => {
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
      description: '',
      type: pricingData?.type,
      websiteFeatures: [
        { title: 'Services', value: '' },
        { title: 'Target Audience', value: '' },
        { title: 'Unique Selling Points', value: '' },
        { title: 'Website Features', value: '' },
        { title: 'Competitor Websites', value: '' },
        { title: 'Style Guide', value: '' },
      ],
      additionalOptions: [
        { title: 'Domain Hosting', value: false },
        { title: 'Ongoing Support', value: false },
        { title: 'Virtual Meeting', value: false },
      ],
      amount: pricingData?.price,
    },

    mode: 'onChange',
  })

  const handleRadioChange = (name, value) => {
    setValue(name, value === 'true')
  }

  const handleCheckOutButton = async (formData) => {
    if (isValid) {
      const filteredWebsiteFeatures = formData.websiteFeatures.filter(
        (item) => item.value.trim() !== ''
      )

      setFinalForm({
        ...formData,
        websiteFeatures: filteredWebsiteFeatures,
      })
      setCheckOutModal(true)
    }
  }

  return (
    <>
      <WrappingModal modalOpen={openModal}>
        <div
          className={`grid bg-white sm:pt-16 pt-8 pb-4 sm:px-24 xs:px-6 px-2 rounded-[20px] overflow-x-hidden`}
        >
          <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
            Provide project details & questionnaire
          </h3>
          <div className="w-full h-[0px] border border-neutral-400 mt-5 mb-14"></div>
          <div className="grid gap-5">
            <div className="grid justify-center">
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
            <div className="grid justify-center">
              <LabelsTwo
                htmlFor={'Describe-the-projects'}
                name={'Describe the Business/projects.'}
              />
              <Input2
                id={'Describe-the-projects'}
                placeholder={'Example: its an salon business in new York etc.'}
                type={'text'}
                cnh={'h-[81.66px]'}
                validationRules={{
                  ...register('description', {
                    required: {
                      value: true,
                      message: 'Description is required',
                    },
                  }),
                }}
              />
              <ErrorMessageTwo errors={errors?.description} />
            </div>
            <div className="grid justify-center gap-5">
              <Input2
                placeholder={'What Services Do You Offer?.'}
                type={'text'}
                validationRules={{
                  ...register('websiteFeatures[0].value'),
                }}
              />
              <Input2
                placeholder={'Who Is Your Target Audience?'}
                type={'text'}
                validationRules={{
                  ...register('websiteFeatures[1].value'),
                }}
              />
              <Input2
                placeholder={'What Makes Your Services Unique?'}
                type={'text'}
                validationRules={{
                  ...register('websiteFeatures[2].value'),
                }}
              />
              <Input2
                placeholder={
                  'What Features Does Your Website Need to Be Successful?'
                }
                type={'text'}
                validationRules={{
                  ...register('websiteFeatures[3].value'),
                }}
              />
              <Input2
                placeholder={
                  'What’s your competitors site or do you have any reference site you like?'
                }
                type={'text'}
                validationRules={{
                  ...register('websiteFeatures[4].value'),
                }}
              />
              <Input2
                placeholder={
                  'Do You Have Any Existing Style Guides and Guidelines?'
                }
                type={'text'}
                validationRules={{
                  ...register('websiteFeatures[5].value'),
                }}
              />
            </div>

            <div className="grid gap-9 mt-10">
              <YesNoRadioInput
                name={'Would You Like Us to Provide domain hosting?'}
                radioFor={'domain&hosting'}
                yesClick={() =>
                  handleRadioChange('additionalOptions[0].value', 'true')
                }
                noClick={() =>
                  handleRadioChange('additionalOptions[0].value', 'false')
                }
              />
              <YesNoRadioInput
                name={
                  'Would You Like Us to Provide Ongoing Support and Maintenance?'
                }
                radioFor={'ongoingS&M'}
                yesClick={() =>
                  handleRadioChange('additionalOptions[1].value', 'true')
                }
                noClick={() =>
                  handleRadioChange('additionalOptions[1].value', 'false')
                }
              />

              <YesNoRadioInput
                name={
                  'Do you need a virtual meeting for this project discussion?'
                }
                radioFor={'virtual-meeting'}
                yesClick={() =>
                  handleRadioChange('additionalOptions[2].value', 'true')
                }
                noClick={() =>
                  handleRadioChange('additionalOptions[2].value', 'false')
                }
              />
            </div>
          </div>
          <div className="grid items-center gap-3 mt-14">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7 "
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
          paymentLink={'websiteDesignAndDev/create-checkout-session'}
          setOpenModal={setCheckOutModal}
          openModal={checkOutModal}
        />
      )}
    </>
  )
}

export default DesignAndDevelopmentModal
