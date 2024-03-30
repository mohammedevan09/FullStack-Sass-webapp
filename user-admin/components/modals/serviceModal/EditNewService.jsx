'use client'

import { Input2 } from '@/components/Input'
import { motion } from 'framer-motion'
import WrappingModal from '../WrappingModal'
import Image from 'next/image'
import Labels from '@/components/Labels'
import ErrorMessage from '@/components/ErrorMessage'
import { useRef } from 'react'

const EditNewService = ({
  openModal,
  setOpenModal,
  register,
  serviceData,
  setServiceData,
  handleSubmit,
  setImage,
  image,
  errors,
  reset,
  isDirty,
  isValid,
}) => {
  const editClickRef = useRef()

  const onImageChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImage([img])
    }
  }

  const handleEditClick = (data) => {
    if ((isDirty && isValid) || image) {
      setServiceData(data)
    }
    setOpenModal(false)
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Edit new Service
        </h3>
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
            <ErrorMessage errors={errors?.name} />
          </div>

          <div className="grid justify-center items-center">
            {!image ? (
              <label
                htmlFor={'svgImage'}
                className="sm:text-xl text-lg font-bold tracking-tight mx-auto flex items-center gap-2 cursor-pointer my-2"
              >
                <Image
                  src={serviceData?.icon}
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
                <Image
                  src={URL.createObjectURL(image[0])}
                  width={60}
                  height={60}
                  className="h-20 w-20"
                  alt="svg"
                />
              </label>
            )}

            <label
              htmlFor={'svgImage'}
              className="sm:text-xl text-lg font-bold tracking-tight mx-auto flex items-center gap-2 cursor-pointer my-2"
            >
              {`Edit Icon (SVG)`}
              <Image
                src={'/images/uploadSvg.png'}
                width={50}
                height={50}
                className="h-9 w-9"
                alt="svg"
              />
            </label>
          </div>
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
            <ErrorMessage errors={errors?.heading} />
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
            <ErrorMessage errors={errors?.subheading} />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-14 mb-3">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full py-2 text-blue-800 rounded-[9px] font-semibold leading-7 text-xl"
            onClick={() => {
              setImage(null)
              reset()
              editClickRef.current.click()
            }}
          >
            Reset
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-2 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            ref={editClickRef}
            onClick={handleSubmit(handleEditClick)}
          >
            Save changes
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default EditNewService
