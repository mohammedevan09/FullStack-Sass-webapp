'use client'

import Input, { Input2 } from '@/components/others/Input'
import { motion } from 'framer-motion'
import WrappingModal from '../WrappingModal'
import { use, useState } from 'react'
import { CheckSignIcon3, CloseIcon } from '@/staticData/Icon'
import { Step, Stepper } from 'react-form-stepper'
import Image from 'next/image'
import Labels from '@/components/others/Labels'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { createServiceApi, uploadSvgIcon } from '@/api/serviceApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const serviceTypes = [
  {
    category: 'Normal',
    description: 'One time payment from client',
    endpoint: '/normalService',
  },
  {
    category: 'Subscription ',
    description: 'Annually or Monthly subscription',
    endpoint: '/subscriptionService',
  },
  {
    category: 'Hourly',
    description: 'Hour based service provide',
    endpoint: '/hourlyService',
  },
]

const AddNewService = ({ openModal, setOpenModal }) => {
  const [active, setActive] = useState('/normalService')
  const [activeStep, setActiveStep] = useState(0)
  const [images, setImages] = useState([])

  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      heading: '',
      subheading: '',
      creatorId: userInfo?._id,
    },

    mode: 'onChange',
  })

  const onImageChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImages([img])
    }
  }

  const handleServiceClick = async (data) => {
    if (activeStep === 1) {
      try {
        toast.loading('Creating new service!', { duration: 1500 })
        const formData = new FormData()
        images.forEach((image) => {
          formData.append(`images`, image)
        })
        const serviceData = await createServiceApi(
          active,
          data,
          userInfo?.token
        )
        await uploadSvgIcon(serviceData?._id, formData, userInfo?.token)
        toast.success(`New Service created successfully!`)
        window.location.reload()
        setOpenModal(false)
        setActiveStep(0)
      } catch (error) {
        toast.error(`New Service creation failed!`)
      }
    } else {
      setActiveStep((prev) => prev + 1)
    }
  }

  const stepComponents = [
    {
      component: <Step1 active={active} setActive={setActive} />,
      step: 0,
    },
    {
      component: (
        <Step2
          onImageChange={onImageChange}
          images={images}
          register={register}
        />
      ),
      step: 1,
    },
  ]
  return (
    <WrappingModal modalOpen={openModal}>
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => setOpenModal(false)}
      >
        <CloseIcon color={'#7a93ff'} />
      </div>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <Stepper
          activeStep={activeStep}
          stepClassName={'stepper-css'}
          steps={[{ label: 'Choose type' }, { label: 'Add info' }]}
        />
        {stepComponents[activeStep]?.component}
        <div className="flex items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full px-4 py-2 rounded-[5px] text-blue-800 text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setActiveStep((prev) => prev - 1)}
            disabled={activeStep === 0}
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full px-4 py-2 bg-blue-800 rounded-[5px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleServiceClick)}
            disabled={
              (!isValid && activeStep === 1) ||
              (images?.length <= 0 && activeStep === 1) ||
              isSubmitting
            }
          >
            {activeStep === 1 ? 'Add Service' : 'Next'}
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export const Step1 = ({ active, setActive }) => {
  return (
    <div className="grid gap-4">
      {serviceTypes?.map((item, i) => (
        <div
          key={i}
          className={`flex justify-between py-3 px-4 rounded-xl border-2 cursor-pointer ${
            active === item?.endpoint ? 'border-blue-800' : 'border-gray-300'
          }`}
          onClick={() => setActive(item?.endpoint)}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 ${
                active === item?.endpoint ? 'bg-blue-800' : 'bg-white'
              } rounded-full flex items-center justify-center`}
            >
              <CheckSignIcon3 color={active === item?.endpoint && 'white'} />
            </div>
            <div className="grid sm:gap-1">
              <h3 className="text-slate-900 text-base font-semibold leading-7 flex justify-start items-center gap-2">
                {item?.category}
              </h3>
              <h4 className="text-zinc-500 text-sm font-normal leading-relaxed">
                {item?.description}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Step2 = ({ onImageChange, images, register }) => {
  return (
    <div>
      <div className="grid gap-5">
        <div className="grid">
          <Labels htmlFor={'name'} name={'Name'} />
          <Input2
            id={'name'}
            placeholder={'Service Name'}
            type={'text'}
            validationRules={{
              ...register('name', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
              }),
            }}
          />
        </div>

        {images?.length !== 0 ? (
          <label
            htmlFor={'svgImage'}
            className="sm:text-xl text-lg font-bold tracking-tight mx-auto flex items-center gap-2 cursor-pointer my-2"
          >
            <Image
              src={URL.createObjectURL(images[0])}
              width={60}
              height={60}
              className="h-20 w-20"
              alt="svg"
            />
          </label>
        ) : (
          <label
            htmlFor={'svgImage'}
            className="sm:text-xl text-lg font-bold tracking-tight mx-auto flex items-center gap-2 cursor-pointer my-2"
          >
            {`Upload Icon (SVG)`}{' '}
            <Image
              src={'/images/uploadSvg.png'}
              width={50}
              height={50}
              className="h-9 w-9"
              alt="svg"
            />
          </label>
        )}

        <input
          type="file"
          className="hidden"
          id="svgImage"
          accept=".svg"
          onChange={onImageChange}
        />
        <div className="grid">
          <Labels htmlFor={'page-heading'} name={'Page heading'} />
          <Input2
            id={'page-heading'}
            placeholder={'Page Heading'}
            type={'text'}
            validationRules={{
              ...register('heading', {
                required: {
                  value: true,
                  message: 'Heading is required',
                },
              }),
            }}
          />
        </div>

        <div className="grid">
          <Labels htmlFor={'page-sub-heading'} name={'Page sub heading'} />
          <Input2
            id={'page-sub-heading'}
            placeholder={'Page Sub Heading'}
            type={'text'}
            validationRules={{
              ...register('subheading', {
                required: {
                  value: true,
                  message: 'Sub Heading is required',
                },
              }),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AddNewService
